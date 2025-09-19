const mailtask_form=require('../models/mail_task_form')
const calltask_form=require('../models/call_task_form')
const sitevisit_form=require('../models/site_visit_form')



 const view_followup_task = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const resp = await mailtask_form.find().lean();
    const resp1 = await calltask_form.find().lean();

    // Merge and sort by createdAt
    let follow_up_task = [...resp, ...resp1].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    

    
    const today = new Date().toLocaleDateString("en-CA");
   
    
    const subtask = req.query.subtask;
    const maintask = req.query.maintask;




    if (subtask === "today") {
      follow_up_task = follow_up_task.filter((item) => {
        const dateString = item.due_date;
        
        if (!dateString) return false;
        const dateOnly = new Date(dateString).toISOString().split("T")[0];
        return dateOnly === today && item.complete !== "true";
     
        
        
      });
    } else if (subtask === "upcoming") {
      follow_up_task = follow_up_task.filter((item) => {
        const dateString = item.due_date;
        if (!dateString) return false;
        const dateOnly = new Date(dateString).toISOString().split("T")[0];
        return dateOnly > today && item.complete !== "true";
      });
    } else if (subtask === "overdue") {
      follow_up_task = follow_up_task.filter((item) => {
        const dateString = item.due_date;
        if (!dateString) return false;
        const dateOnly = new Date(dateString).toISOString().split("T")[0];
        return dateOnly < today && item.complete !== "true";
      });
    } else if (subtask === "complete") {
      follow_up_task = follow_up_task.filter(
        (item) => item.complete === "true"
      );
    } else if (subtask === "custom") {
      const { from, to } = req.query;

      if (from && to) {
        follow_up_task = follow_up_task.filter((item) => {
          const dateString = item.due_date;
          if (!dateString) return false;

          const dateOnly = new Date(dateString).toISOString().split("T")[0];
          return (
            dateOnly >= from &&
            dateOnly <= to &&
            item.complete !== "true"
          );
        });
      }
    }
    
    

    // Apply pagination
    const paginatedTasks = follow_up_task.slice(skip, skip + limit);

    res.status(200).send({
      message: "Follow up tasks fetched successfully",
      total: follow_up_task.length,
      page,
      limit,
      followup_task: paginatedTasks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error fetching follow-up tasks" });
  }
};


 const view_sitevisit_task = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const resp = await sitevisit_form.find()

    // Merge and sort by createdAt
    let sitevisit_task = resp.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    console.log(req.query);
    

    
    const today = new Date().toLocaleDateString("en-CA");
   
    
    const subtask = req.query.subtask;
    const maintask = req.query.maintask;




    if (subtask === "today") {
      sitevisit_task = sitevisit_task.filter((item) => {
        const dateString = item.start_date;
        
        if (!dateString) return false;
        const dateOnly = new Date(dateString).toISOString().split("T")[0];
        return dateOnly === today && item.complete !== "true";
     
        
        
      });
    } else if (subtask === "upcoming") {
      sitevisit_task = sitevisit_task.filter((item) => {
        const dateString = item.start_date;
        if (!dateString) return false;
        const dateOnly = new Date(dateString).toISOString().split("T")[0];
        return dateOnly > today && item.complete !== "true";
      });
    } else if (subtask === "overdue") {
      sitevisit_task = sitevisit_task.filter((item) => {
        const dateString = item.start_date;
        if (!dateString) return false;
        const dateOnly = new Date(dateString).toISOString().split("T")[0];
        return dateOnly < today && item.complete !== "true";
      });
    } else if (subtask === "complete") {
      sitevisit_task = sitevisit_task.filter(
        (item) => item.complete === "true"
      );
    } else if (subtask === "custom") {
      const { from, to } = req.query;

      if (from && to) {
        sitevisit_task = sitevisit_task.filter((item) => {
          const dateString = item.due_date;
          if (!dateString) return false;

          const dateOnly = new Date(dateString).toISOString().split("T")[0];
          return (
            dateOnly >= from &&
            dateOnly <= to &&
            item.complete !== "true"
          );
        });
      }
    }
    
    

    // Apply pagination
    const paginatedTasks = sitevisit_task.slice(skip, skip + limit);

    res.status(200).send({
      message: "Sitevisit tasks fetched successfully",
      total: sitevisit_task.length,
      page,
      limit,
      sitevisit_task: paginatedTasks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error fetching follow-up tasks" });
  }
};



module.exports={view_followup_task,view_sitevisit_task}