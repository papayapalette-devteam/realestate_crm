
const Deal = require('../../models/deal.js');
const Project = require("../../models/project");
const Lead = require("../../models/leadinfo.js");


require('dotenv').config()


// Returns distance in kilometers
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 0;

  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}




const matched_deals = async (req, res) => {
  try {
    const leads = req.body.leads;
    if (!Array.isArray(leads)) {
      return res.status(400).json({ msg: "Leads must be an array" });
    }

    const deals = await Deal.find({}).lean();
   
    const units = await Project.aggregate([
      { $match: { name: { $in: deals.map(d => d.project) } } },
      { $unwind: "$add_unit" },
      { $match: { 
          $or: deals.map(d => ({
              "add_unit.unit_no": d.unit_number,
              "add_unit.block": d.block
          }))
      }},
      { $replaceRoot: { newRoot: "$add_unit" } }
    ]);

    const finalLeads = leads.map((lead) => {
      const matchedDeals = [];

      for (const deal of deals) {
        const unit = units.find(
          (u) =>
            u.project_name?.toLowerCase().trim() === deal.project?.toLowerCase().trim() &&
            u.unit_no?.toString().trim() === deal.unit_number?.toString().trim() &&
            u.block?.toLowerCase().trim() === deal.block?.toLowerCase().trim()
        );

        if (!unit) continue;

        const distance = getDistanceFromLatLonInKm(
          unit.lattitude,
          unit.langitude,
          lead.lattitude,
          lead.longitude
        );

        const unitsize = unit.size;
        const match = unitsize?.match(/^([\d.]+)\s+([^\(]+)\s+\(([\d.]+)\s+Sq\s+Yard\)/);
        let unittype = "";
        let size = 0;
        if (match) {
          unittype = match[1] + " " + match[2].trim();
          size = parseFloat(match[3]);
        }

        const availableFor = lead.requirment === "Buy" ? "Sale" : lead.requirment;
        const minprice = parseFloat(lead.budget_min);
        const maxprice = parseFloat(lead.budget_max);
        const minsize = parseFloat(lead.minimum_area);
        const maxsize = parseFloat(lead.maximum_area);
        const areaproject = lead.area_project;
        const block = lead.block3;
        const specificunit = lead.specific_unit;
        const facing = lead.facing;
        const road = lead.road;
        const direction = lead.direction;
        const unit_type_array = lead.unit_type || [];

       
        

        if (
          deal.available_for === availableFor &&
          Number(deal.expected_price) >= minprice &&
          Number(deal.expected_price) <= maxprice &&
          (lead.property_type?.length === 0 || (unit.category && lead.property_type.some(pt => unit.category.includes(pt)))) &&
          (lead.sub_type?.length === 0 || (Array.isArray(unit.sub_category) && unit.sub_category.some(uc => lead.sub_type.some(st => st.toLowerCase().trim() === uc.toLowerCase().trim())))) &&
          (unit_type_array === 0 || (Array.isArray(unit_type_array) && unit_type_array.some(uc => uc.toLowerCase().trim() === unittype.toLowerCase().trim()))) &&

          (
            (facing && unit.facing && facing.includes(unit.facing)) ||
            (road && unit.road && road.includes(unit.road)) ||
            (direction && unit.direction && direction === unit.direction) ||
            (areaproject && unit.project_name && areaproject.includes(unit.project_name)) ||
            (block && unit.block && block.includes(unit.block)) ||
            (specificunit && unit.unit_no && specificunit === unit.unit_no) ||
            (size >= minsize && size <= maxsize) ||
            (distance <= lead.range)
          )
        ) {
          matchedDeals.push(deal._id);
        }
      }

      return {
        ...lead,
        matcheddeals:matchedDeals,
        matchingdeal: matchedDeals.length
      };
    });

    // --- Update leads in DB ---
    for (const lead of finalLeads) {
      await Lead.updateOne(
        { _id: lead._id },
        { $set: { matcheddeals: lead.matcheddeals, matchingdeal: lead.matchingdeal } }
      );
    }

    res.json({ count: finalLeads.length, data: finalLeads });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};


// matched_deals()
module.exports=matched_deals