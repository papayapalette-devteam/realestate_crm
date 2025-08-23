import {React, useState,useEffect,useRef} from "react";
import Sidebar1 from './sidebar1'
import Header1 from './header1'
import { Select, MenuItem, Checkbox, ListItemText } from '@mui/material';
import api from "../api";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Leadrequirmentform() {

    const navigate=useNavigate()
    
    const location=useLocation()
    // const leaddata=location.state
  const queryParams = new URLSearchParams(location.search);
  const leaddata = queryParams.get('owner');

        
     const [leadinfo,setleadinfo]=useState({title:"Mr.",first_name:"",last_name:"",country_code:[''],mobile_no:[''],mobile_type:[''],action11:[],
            email:[''],email_type:[''],action22:[],tags:"",descriptions:"",stage:"",lead_type:"",owner:[],team:"",visible_to:"",campaign:"",source:"",
            sub_source:"",channel_partner:"",intrested_project:"",
            requirment:"",property_type:[],purpose:"",nri:"",sub_type:[],unit_type:[],budget_min:"",budget_max:"",minimum_area:"",
            maximum_area:"",area_metric:"Sq Yard",search_location:"",street_address:"",range:"",range_unit:"",city2:"",area2:[],block:[],pincode2:"",country2:"",state2:"",
            lattitude:"",longitude:"",country3:"",state3:"",city3:"",area_project:[],block3:[],specific_unit:"",specific_unitdetails:"",funding:"",timeline:"",facing:[],road:[],direction:[],transaction_type:"",
            unit_type2:[],white_portion:"",furnishing:"",
            profession_category:[],profession_subcategory:[],designation:"",company_name:"",country_code1:"",company_phone:"",
            company_email:"",area:"",location:"",city:"",pincode:"",state:"",country:"",industry:"",company_social_media:[''],company_url:[''],action3:[],
    
            father_husband_name:"",h_no:"",area1:"",location1:"",city1:"",pincode1:"",state1:"",country1:"",gender:"",maritial_status:"",
            birth_date:"",anniversary_date:"",education:[''],degree:[''],school_college:[''],action4:[],loan:[''],bank:[''],amount:[''],action5:[],
            social_media:[''],url:[''],action6:[],income:[''],amount1:[''],action7:[],document_no:[''],document_name:[''],document_pic:[''],action8:[],
            matcheddeals:[],matchingdeal:"",})

    
        const fetchdata=async()=>
        {
          try {
            const resp=await api.get('viewcontact')
           if (resp.data && resp.data.contact) {
            const match = resp.data.contact.find((item) => {
                const fullname = `${item.title} ${item.first_name} ${item.last_name}`;
                return fullname === leaddata;
            });
          
           if (match) {
                setleadinfo(match);
                }
            }
         } catch (error) {
            console.log(error);
          }
        
        }
    
    useEffect(()=>{fetchdata()},[])
    console.log(leadinfo);
    

                        const requirment=["Buy","Rent","Lease"];
                        const transaction_type=["Full White","Collecter Rate","Flexiable"];
                        const furnishing=["Furnished","Unfurnished","Semi Furnished"];
                        const funding=["Home Loan","Self Funding","Loan Against Property","Personal Loan","Business Loan"]
                        const timeline=["Urgent","More then 1 month","Not Confirmed","Within 15 days"]

            const matchdeal=["What'sApp","Message","Mail"];
            
            const [matchdeals, setmatcheddeals] = useState([]);
            
            const handlematcheddealChange = (event) => {
              const {
                target: { value },
              } = event;
            
              // If "Select All" is clicked
              if (value.includes('select-all')) {
                // If all options are already selected, deselect them (uncheck all)
                if (matchdeals.length === matchdeal.length) {
                  setmatcheddeals([]); // Deselect all options
                  setleadinfo({ ...leadinfo, matched_deal: [] }); // Update matched_deal in leadinfo
                } else {
                  // Otherwise, select all options
                  setmatcheddeals(matchdeal); // Select all options
                  setleadinfo({ ...leadinfo, matched_deal: matchdeal }); // Update matched_deal in leadinfo
                }
              } else {
                // If individual items are selected/deselected
                const selectedmatcheddeal = typeof value === 'string' ? value.split(',') : value;
                setmatcheddeals(selectedmatcheddeal); // Update selected deals
                setleadinfo({ ...leadinfo, matched_deal: selectedmatcheddeal }); // Update matched_deal with selected options
              }
            };
            
            
            const [progress, setProgress] = useState(leadinfo.white_portion || 0); // Initialize with deal.whiteportion
            
            const handleMouseMove = (e) => {
              const progressBar = e.target.getBoundingClientRect();
              const newProgress = ((e.clientX - progressBar.left) / progressBar.width) * 100;
              const clampedProgress = Math.max(0, Math.min(newProgress, 100)); // Clamp between 0 and 100
              setProgress(clampedProgress);
              setleadinfo((prevLead) => ({ ...prevLead, white_portion: clampedProgress })); // Update deal.whiteportion
            };
            
            const handleMouseDown = (e) => {
              handleMouseMove(e); // Set initial progress
              window.addEventListener('mousemove', handleMouseMove);
              window.addEventListener('mouseup', handleMouseUp);
            };
            
            const handleMouseUp = () => {
              window.removeEventListener('mousemove', handleMouseMove);
              window.removeEventListener('mouseup', handleMouseUp);
            };
            
            
            const facing=["Park","Green Belt","Highway","Commercial","School","Hospital","Mandir","Gurudwara","Crech","Clinic","Community Centre",
              "1 Kanal","14m Marla","10 Marla","8 Marla","6 Marla","4 Marla","2 Marla","3 Marla","2 Kanal"];
            
            const [facings, setfacings] = useState([]);
            
            const handlefacingChange = (event) => {
              const {
                target: { value },
              } = event;
            
              // If "Select All" is clicked
              if (value.includes('select-all')) {
                // If all options are already selected, deselect them (uncheck all)
                if (facings.length === facing.length) {
                  setfacings([]); // Deselect all options
                  setleadinfo({ ...leadinfo, facing: [] }); // Update facing in leadinfo
                } else {
                  // Otherwise, select all options
                  setfacings(facing); // Select all options
                  setleadinfo({ ...leadinfo, facing: facing }); // Update facing in leadinfo
                }
              } else {
                // Handle individual selections/deselections
                const selectedfacing = typeof value === 'string' ? value.split(',') : value;
                setfacings(selectedfacing); // Update selected facings
                setleadinfo({ ...leadinfo, facing: selectedfacing }); // Update facing in leadinfo
              }
            };
            
            const road=["9 Mtr Wide","12 Mtr Wide","18 Mtr Wide","24 Mtr Wide","60 Mtr Wide"];  
            
            const [roads, setroads] = useState([]);
            
            const handleroadChange = (event) => {
              const {
                target: { value },
              } = event;
            
              // If "Select All" is clicked
              if (value.includes('select-all')) {
                // If all options are already selected, deselect them (uncheck all)
                if (roads.length === road.length) {
                  setroads([]); // Deselect all options
                  setleadinfo({ ...leadinfo, road: [] }); // Update road in leadinfo
                } else {
                  // Otherwise, select all options
                  setroads(road); // Select all options
                  setleadinfo({ ...leadinfo, road: road }); // Update road in leadinfo
                }
              } else {
                // Handle individual selections/deselections
                const selectedroad = typeof value === 'string' ? value.split(',') : value;
                setroads(selectedroad); // Update selected roads
                setleadinfo({ ...leadinfo, road: selectedroad }); // Update road in leadinfo
              }
            };
            
            const direction=["East","West","North","South","North East","South East","South West","North West"];      
             
            const [directions, setdirections] = useState([]);
            
            const handledirectionChange = (event) => {
              const {
                target: { value },
              } = event;
            
              if (value.includes('select-all')) {
            
                if (directions.length === direction.length) {
                  setdirections([]);
                  setleadinfo({ ...leadinfo, direction: [] }); 
                } else {
                  setdirections(direction);
                  setleadinfo({ ...leadinfo, direction: direction });
                }
              } else {
                const selecteddirections = typeof value === 'string' ? value.split(',') : value;
                setdirections(selecteddirections); 
                setleadinfo({ ...leadinfo, direction: selecteddirections }); 
              }
            };
            
            const propertyunittype=["Two Side Open","Three Side Open","Ordinary","Corner"];      
            
            const [propertyunitstypes, setpropertyunitstypes] = useState([]);
            
            const handlepropertyunitstypesChange = (event) => {
              const {
                target: { value },
              } = event;
            
              if (value.includes('select-all')) {
            
                if (propertyunitstypes.length === propertyunittype.length) {
                  setpropertyunitstypes([]);
                  setleadinfo({ ...leadinfo, unit_type2: [] }); 
                } else {
                  setpropertyunitstypes(propertyunittype);
                  setleadinfo({ ...leadinfo, unit_type2: propertyunittype });
                }
              } else {
                const selectedpropertyunittype = typeof value === 'string' ? value.split(',') : value;
                setpropertyunitstypes(selectedpropertyunittype); 
                setleadinfo({ ...leadinfo, unit_type2: selectedpropertyunittype }); 
              }
            };

            // ==============================================search loaction from google start========================================================
                                                            
                                                                
                                   
                                                          const inputRef = useRef(null);
                                                          const apiKey = 'AIzaSyACfBzaJSVH8eur7U9JxdjI1bAeTLXsUJc';
                                                        
                                                          useEffect(() => {
                                                            const scriptExists = document.querySelector('#google-maps-script');
                                                            if (!scriptExists) {
                                                              const script = document.createElement('script');
                                                              script.id = 'google-maps-script';
                                                              script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
                                                              script.async = true;
                                                              script.defer = true;
                                                              script.onload = initializeAutocomplete;
                                                              document.body.appendChild(script);
                                                            } else {
                                                              initializeAutocomplete();
                                                            }
                                                          }, []);
                                                        
                                                          const initializeAutocomplete = () => {
                                                            if (!inputRef.current || !window.google) return;
                                                        
                                                            const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
                                                              types: ['geocode']
                                                            });
                                                        
                                                            autocomplete.addListener('place_changed', () => {
                                                              const place = autocomplete.getPlace();
                                                              if (!place.geometry) return;
                                                        
                                                              const lat = place.geometry.location.lat();
                                                              const lng = place.geometry.location.lng();
                                                        
                                                              const components = place.address_components;
                                                              let address = '', city = '', zip = '', state = '', country = '';
                                                        
                                                              components.forEach(component => {
                                                                const types = component.types;
                                                                if (types.includes('route') || types.includes('sublocality')) {
                                                                  address += component.long_name + ' ';
                                                                }
                                                                if (types.includes('locality')) {
                                                                  city = component.long_name;
                                                                }
                                                                if (types.includes('postal_code')) {
                                                                  zip = component.long_name;
                                                                }
                                                                if (types.includes('administrative_area_level_1')) {
                                                                  state = component.long_name;
                                                                }
                                                                if (types.includes('country')) {
                                                                  country = component.long_name;
                                                                }
                                                              });
                                                        
                                                              setleadinfo(prev => ({
                                                                ...prev,
                                                                search_location: place.formatted_address,
                                                                street_address: address.trim(),
                                                                city2: city,
                                                                pincode2: zip,
                                                                state2: state,
                                                                country2: country,
                                                                lattitude: lat,
                                                                longitude: lng
                                                              }));
                                                            });
                                                          };
                                                        
                                                          const getlocation = async (e) => {
                                                            e.preventDefault();
                                                            try {
                                                              const res = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                                                                params: {
                                                                  address: leadinfo.search_location,
                                                                  key: apiKey
                                                                }
                                                              });
                                                        
                                                              if (res.data.results.length > 0) {
                                                                const result = res.data.results[0];
                                                                const lat = result.geometry.location.lat;
                                                                const lng = result.geometry.location.lng;
                                                        
                                                                const components = result.address_components;
                                                                let address = '', city = '', zip = '', state = '', country = '';
                                                        
                                                                components.forEach(component => {
                                                                  const types = component.types;
                                                                  if (types.includes('route') || types.includes('sublocality')) {
                                                                    address += component.long_name + ' ';
                                                                  }
                                                                  if (types.includes('locality')) {
                                                                    city = component.long_name;
                                                                  }
                                                                  if (types.includes('postal_code')) {
                                                                    zip = component.long_name;
                                                                  }
                                                                  if (types.includes('administrative_area_level_1')) {
                                                                    state = component.long_name;
                                                                  }
                                                                  if (types.includes('country')) {
                                                                    country = component.long_name;
                                                                  }
                                                                });
                                                        
                                                                setleadinfo(prev => ({
                                                                  ...prev,
                                                                  street_address: address.trim(),
                                                                  city2: city,
                                                                  pincode2: zip,
                                                                  state2: state,
                                                                  country2: country,
                                                                  lattitude: lat,
                                                                  longitude: lng
                                                                }));
                                                              }
                                                            } catch (err) {
                                                              console.error('Geocode error:', err);
                                                            }
                                                          };
// ===========================================search loaction from google end========================================================



                                        const[data11,setdata11]=useState([]);
                                      const fetchdatabyprojectcityname=async()=>
                                      {
                                        
                                        try {
                                          const city=leadinfo.city3
                                          const resp=await api.get(`viewprojectbycityname/${city}`)
                                          console.log(resp);
                                          
                                          setdata11(resp.data.project)
                                        } catch (error) {
                                          console.log(error);
                                        }
                                      }
                                      useEffect(() => {
                                        fetchdatabyprojectcityname()
                                         
                                        
                                      }, [leadinfo.city3]);

                                      const allproject =[]
                                      data11.map((item)=>
                                      (
                                          allproject.push(item.name)
                                      ))

                                      const [units, setunits] = useState([]);
                                    
                                      const [allblocks, setallblocks] = useState([]);
                                    
                                    
                                      const fetchdatabyprojectname = async (projectNames) => {
                                        try {
                                          // Initialize a temporary array to hold all fetched units
                                          const allUnits = [];
                                      
                                          // Fetch the data sequentially for each project
                                          for (const projectName of projectNames) {
                                            const resp = await api.get(`viewprojectbyname/${projectName}`);
                                            const allFetchedUnits = resp.data.project; // Assuming resp.data.project is an array of units
                                            allUnits.push(...allFetchedUnits); // Accumulate the fetched units
                                          }
                                      
                                          // Update the state with the accumulated units
                                          setunits(allUnits);
                                        } catch (error) {
                                          console.log(error);
                                        }
                                      };
                                      
                                      
                                      useEffect(() => {
                                        if (units.length >= 0) {
                                         
                                          const collectedblocks=units.flatMap(item=>item.add_block)
                                 
                                          setallblocks(collectedblocks) 
                                         
                                        }
                                      }, [units]);
                                    
                                     
                                     
                                      
                                    
                                      
                                      
                                      
                                      const handleprojectchange = (event) => {
                                        const selectproject = event.target.value;
                                    
                                        // If the "Select All" option is selected
                                        if (selectproject.includes('select-all')) {
                                          // If all projects are already selected, deselect all
                                          if (leadinfo?.area_project?.length === allproject.length) {
                                            setleadinfo((prev) => {
                                              const updateproject = { ...prev, area_project: [] }; // Deselect all
                                              return updateproject;
                                            });
                                          } else {
                                            // Select all projects
                                            setleadinfo((prev) => {
                                              const updateproject = { ...prev, area_project: allproject }; // Select all
                                              fetchdatabyprojectname(allproject); // Fetch data with the selected projects
                                              return updateproject;
                                            });
                                          }
                                        } else {
                                          // Handle individual project selection/deselection
                                          setleadinfo((prev) => {
                                            const updateproject = { ...prev, area_project: selectproject };
                                            fetchdatabyprojectname(selectproject); // Fetch data with the updated project names
                                            return updateproject;
                                          });
                                        }
                                      };
                                    
                               
                                    
                                      const handleallblockchange = (event) => {
                                        const selectblocks = event.target.value;
                                    
                                        // If the "Select All" option is selected
                                        if (selectblocks.includes("select-all")) {
                                          // If all blocks are selected, deselect all
                                          if (leadinfo?.block3?.length === allblocks.length) {
                                            setleadinfo((prev) => {
                                              const updateblock = { ...prev, block3: [] }; // Deselect all
                                              return updateblock;
                                            });
                                          } else {
                                            // Select all blocks
                                            const allBlockNames = allblocks.map(project => project.block_name);
                                            setleadinfo((prev) => {
                                              const updateblock = { ...prev, block3: allBlockNames }; // Select all
                                              return updateblock;
                                            });
                                          }
                                        } else {
                                          // Handle individual block selection or deselection
                                          setleadinfo((prev) => {
                                            const updateblock = { ...prev, block3: selectblocks };
                                            return updateblock;
                                          });
                                        }
                                      }


  const asianCountries = [
    "Afghanistan", "Armenia", "Azerbaijan", "Bahrain", "Bangladesh", "Bhutan", 
    "Brunei", "Burma (Myanmar)", "Cambodia", "China", "Cyprus", "Georgia", 
    "India", "Indonesia", "Iran", "Iraq", "Israel", "Japan", "Jordan", 
    "Kazakhstan", "Kuwait", "Kyrgyzstan", "Laos", "Lebanon", "Malaysia", 
    "Maldives", "Mongolia", "Nepal", "North Korea", "Oman", "Pakistan", 
    "Palestine", "Philippines", "Qatar", "Saudi Arabia", "Singapore", 
    "South Korea", "Sri Lanka", "Syria", "Tajikistan", "Thailand", 
    "Timor-Leste", "Turkmenistan", "United Arab Emirates", "Uzbekistan", 
    "Vietnam", "Yemen"
  ];
   const statesAndCities = {
                      AndhraPradesh: ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"],
                      ArunachalPradesh: ["Tawang", "West Kameng", "East Kameng", "Papum Pare", "Kurung Kumey", "Kra Daadi", "Lower Subansiri", "Upper Subansiri", "West Siang", "East Siang", "Upper Siang", "Lower Siang", "Lower Dibang Valley", "Dibang Valley", "Anjaw", "Lohit", "Namsai", "Changlang", "Tirap", "Longding"],
                      Assam: ["Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Dima Hasao", "Sivasagar", "Sonitpur", "South Salmara-Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"],
                      Bihar: ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"],
                      Delhi: ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"],
                      Goa: ["North Goa", "South Goa"],
                      Gujarat: ["Ahmedabad", "Amreli", "Anand", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udepur", "Dahod", "Dang", "Gir Somnath", "Jamnagar", "Junagadh", "Kachchh", "Kheda", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"],
                      Haryana: ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Narnaul", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"],
                      HimachalPradesh: ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kullu", "Kullu", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"],
                      Jharkhand: ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahebganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"],
                      Karnataka: ["Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", "Bidar", "Chamarajanagar", "Chikballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir"],
                      Kerala: ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kottayam", "Kollam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"],
                      MadhyaPradesh: ["Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhindwara", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Panna", "Rewa", "Rajgarh", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"],
                      Maharashtra: ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"],
                      Manipur: ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"],
                      Meghalaya: ["East Garo Hills", "East Khasi Hills", "Jaintia Hills", "Ri Bhoi", "West Garo Hills", "West Khasi Hills"],
                      Mizoram: ["Aizawl", "Champhai", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Serchhip"],
                      Nagaland: ["Dimapur", "Kohima", "Mokokchung", "Mon", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"],
                      Odisha: ["Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Deogarh", "Dhenkanal", "Ganjam", "Gajapati", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"],
                      Punjab: ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Firozpur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Muktsar", "Nawan Shehar", "Patiala", "Rupnagar", "Sangrur", "SAS Nagar", "Sri Muktsar Sahib"],
                      Rajasthan: ["Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bhilwara", "Bikaner", "Bundi", "Churu", "Dausa", "Dholpur", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer", "Jhalawar", "Jhunjhunu", "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi", "Tonk", "Udaipur"],
                      Sikkim: ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
                      TamilNadu: ["Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kancheepuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Salem", "Sivagangai", "Tenkasi", "Thanjavur", "The Nilgiris", "Thoothukudi", "Tiruvallur", "Tirunelveli", "Tirupur", "Vellore", "Viluppuram", "Virudhunagar"],
                      Telangana: ["Adilabad", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar", "Jogulamba", "Kamareddy", "Karimnagar", "Khammam", "Mahabubabad", "Mahabubnagar", "Mancherial", "Medak", "Medchal", "Nalgonda", "Nagarkurnool", "Nirmal", "Nizamabad", "Peddapalli", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Warangal", "Khammam", "Kothagudem"],
                      Tripura: ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"],
                      UttarPradesh: ["Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Faizabad", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddh Nagar", "Ghaziabad", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur", "Kasganj", "Kaushambi", "Kushinagar", "Lakhimpur Kheri", "Lucknow", "Mathura", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar","Noida", "Pratapgarh", "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shrawasti", "Siddharth Nagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"],
                      WestBengal: ["Alipurduar", "Bankura", "Birbhum", "Burdwan", "Cooch Behar", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "North Dinajpur", "Paschim Medinipur", "Purba Medinipur", "Purulia", "South 24 Parganas", "South Dinajpur", "Uttar Dinajpur"],
                      "Andaman And Nicobar Islands": ["Port Blair", "Car Nicobar", "Mayabunder", "Diglipur", "Rangat"],
                      Chandigarh: ["Chandigarh"],
                      "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Silvassa"],
                      "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Doda", "Gulmarg", "Kathua", "Poonch", "Rajouri", "Udhampur"],
                      Ladakh: ["Leh", "Kargil"],
                      Lakshadweep: ["Kavaratti", "Andrott", "Kalapeni", "Minicoy", "Agatti", "Kadmat", "Chetlat"],
                      Puducherry: ["Puducherry", "Karaikal","Mahe","Yanam"],
                    };

  const states = Object.keys(statesAndCities);
  const cities = statesAndCities[leadinfo.state3] || [];

    const options = {
                                                property_type: ["Residential", "Commercial","Agricultural","Industrial","Institutional"],
                                                sub_type: {
                                                  Residential: ["PLOT", "INDEPENDENT HOUSE","FLAT/APARTMENT","BUILDER FLOOR"],
                                                  Commercial: ["SHOP", "SHOWROOM","OFFICE SPACE","RETAIL STORE","SOHO","EXCUTIVE ROOM","MULTIPLEX","VIRTUAL SPACE","PLOT"],
                                                  Agricultural: ["LAND", "FARM HOUSE"],
                                                  Industrial: ["PLOTS", "WAREHOUSE","COLD STORAGE","RICE SELLER","BUILDING","FACTORY"],
                                                  Institutional: ["SCHOOL", "HOTEL","UNIVERSITIES","HOSPITAL","COLLEGE"]
                                                },
                                                unit_type: {
                                                  PLOT: ["1 Kanal", "2 Kanal","16 Marla","14 Marla","10 Marla","8 Marla","6 Marla","4 Marla","3 Marla","2 Marla"],
                                                  "INDEPENDENT HOUSE": ["1 Kanal", "2 Kanal","16 Marla","14 Marla","10 Marla","8 Marla","6 Marla","4 Marla","3 Marla","2 Marla"],
                                                  "FLAT/APARTMENT": ["1 BHK", "2 BHK","3 BHK","4 BHK","5 BHK","STUDIO"],
                                                  "BUILDER FLOOR": ["1 BHK", "2 BHK","3 BHK","4 BHK","5 BHK","STUDIO"],
                                                  SHOP:["BOOTH","KIOSAK",],
                                                  SHOWROOM:["SCO","SCF","DSS"],
                                                  "OFFICE SPACE":["LOCABLE OFFICE","VIRTUAL OFFICE"],
                                                  "RETAIL STORE":["HYPER MARKET","DEPARTMETAL STORE"],
                                                  SOHO:["SOHO"],
                                                  "EXCUTIVE ROOM":["ROOM"],
                                                  LAND:["CROPLAND","WOODLAND","PASTURE","COMMERCIAL"],
                                                  "FARM HOUSE":["FARM"],
                                                  PLOTS:["1 KANAL","10 MARLA","2 KANAL","1 ACRE","2 KANAL"],
                                                  WAREHOUSE:["WRHSE"],
                                                  "COLD STORAGE":["CLDSTRG"],
                                                  "RICE SELLER":["RCSLR"],
                                                  "BUILDING":["BLDG"],
                                                  FACTORY:["FCTRY"],
                                                  SCHOOL:["NURSERY SCHOOL","CRECH","HIGH SCHOOL","PRIMERY SCHOOL"],
                                                  HOTEL:["HOTEL","GUEST HOUSE","HOMESTAYS"],
                                                  UNIVERSITIES:["DEEMED","PRIVATE"],
                                                  HOSPITAL:["NURSING HOME","CLINIC"],
                                                  COLLEGE:["ART COLLEGE","TECHNICAL COLLEGE","MEDICAL COLLEGE"]
                                                },
                                              };
                                              
                                              const handleCategoryChange = (event) => {
                                                const selectedCategories = event.target.value;
                                              
                                                // Update categories and reset dependent fields
                                              
                                                
                                              
                                                setleadinfo((prevLead)=>({
                                                  ...prevLead,
                                                  property_type: selectedCategories,
                                                  sub_type: [], // Ensure uniqueness
                                                  unit_type: [], // Ensure uniqueness
                                                }));
                                              };
                                  
               const getAvailableunittype = () => {
                                                // Step 1: Ensure leadinfo.sub_type is an array before calling flatMap
                                                if (Array.isArray(leadinfo.sub_type)) {
                                                  return leadinfo.sub_type.flatMap((cat) => Array.isArray(options.unit_type[cat]) ? options.unit_type[cat] : []);
                                                }
                                                return [];  // Return an empty array if leadinfo.sub_type is not an array
                                              };
                                              
                                              const handleUnitTypeChange = (event) => {
                                                const selectedUnitTypes = event.target.value;
                                                setleadinfo((prevLead) => ({
                                                  ...prevLead,
                                                  unit_type: selectedUnitTypes,
                                                }));
                                              };

                                              const handleSubcategoryChange = (event) => {
                                                const selectedSubcategories = event.target.value;
                                              
                                                // Update subcategories and dependent unit types
                                               
                                                setleadinfo((prevLead) => ({
                                                  ...prevLead,
                                                  sub_type: selectedSubcategories,
                                                  unit_type: [], // Ensure uniqueness
                                                }));
                                              };
                                              const getAvailableSubcategories = () => {
                                                if (Array.isArray(leadinfo.property_type)) {
                                                  return leadinfo.property_type.flatMap((cat) => Array.isArray(options.sub_type[cat]) ? options.sub_type[cat] : []);
                                                }
                                                return [];  // Return an empty array if leadinfo.property_type is not an array
                                              };                                                  
                                                            
             const areaoptions = [
                                              { value: 10, label: "10" },                 
                                              { value: 25, label: "25" },
                                              { value: 50, label: "50" },
                                              { value: 75, label: "75" },
                                              { value: 100, label: "100" },
                                              { value: 125, label: "125" },
                                              { value: 150, label: "150" },
                                              { value: 175, label: "175" },
                                              { value: 200, label: "200" },
                                              { value: 225, label: "225" },
                                              { value: 250, label: "250" },
                                              { value: 300, label: "300" },
                                              { value: 350, label: "350" },
                                              { value: 400, label: "400" },
                                              { value: 450, label: "450" },
                                              { value: 550, label: "550" },
                                              { value: 750, label: "750" },
                                              { value: 1000, label: "1000" },
                                              { value: 2000, label: "2000" },
                                              { value: 5000, label: "5000" },
                                              { value: 7500, label: "7500" },
                                              { value: 10000, label: "10000" }
                                            ];

                                            const filteredarea = leadinfo.minimum_area
                                            ? areaoptions.filter((option) => option.value >= leadinfo.minimum_area)
                                            : areaoptions;

                                            const budgetOptions = [
                                              { value: 5000, label: "5,000/- (five thousand)" },
                                              { value: 10000, label: "10,000/- (ten thousand)" },
                                              { value: 20000, label: "20,000/- (twenty thousand)" },
                                              { value: 30000, label: "30,000/- (thirty thousand)" },
                                              { value: 50000, label: "50,000/- (fifty thousand)" },
                                              { value: 80000, label: "80,000/- (eighty thousand)" },
                                              { value: 100000, label: "1,00,000/- (one lakh)" },
                                              { value: 150000, label: "1,50,000/- (one and a half lakh)" },
                                              { value: 200000, label: "2,00,000/- (two lakh)" },
                                              { value: 250000, label: "2,50,000/- (two and a half lakh)" },
                                              { value: 350000, label: "3,50,000/- (three and a half lakh)" },
                                              { value: 500000, label: "5,00,000/- (five lakh)" },
                                              { value: 750000, label: "7,50,000/- (seven and a half lakh)" },
                                              { value: 1000000, label: "10,00,000/- (ten lakh)" },
                                            ];
                                          
                                            // Filter max budget options based on selected min budget
                                            const filteredMaxBudgetOptions = leadinfo.budget_min
                                              ? budgetOptions.filter((option) => option.value >= leadinfo.budget_min)
                                              : budgetOptions;
    
                                              const buyBudgetOptions = [
                                                { value: 1000000, label: "10,00,000/- (ten lakh)" },
                                                { value: 2500000, label: "25,00,000/- (twenty five lakh)" },
                                                { value: 5000000, label: "50,00,000/- (fifty lakh)" },
                                                { value: 7500000, label: "75,00,000/- (seventy five lakh)" },
                                                { value: 10000000, label: "1,00,00,000/- (one crore)" },
                                                { value: 12500000, label: "1,25,00,000/- (one crore twenty five lakh)" },
                                                { value: 15000000, label: "1,50,00,000/- (one crore fifty lakh)" },
                                                { value: 20000000, label: "2,00,00,000/- (two crore)" },
                                                { value: 30000000, label: "3,00,00,000/- (three crore)" },
                                                { value: 40000000, label: "4,00,00,000/- (four crore)" },
                                                { value: 50000000, label: "5,00,00,000/- (five crore)" },
                                                { value: 75000000, label: "7,50,00,000/- (seven crore fifty lakh)" },
                                                { value: 100000000, label: "10,00,00,000/- (ten crore)" },
                                                { value: 150000000, label: "15,00,00,000/- (fifteen crore)" },
                                                { value: 200000000, label: "20,00,00,000/- (twenty crore)" },
                                                { value: 300000000, label: "30,00,00,000/- (thirty crore)" },
                                                { value: 500000000, label: "50,00,00,000/- (fifty crore)" },
                                                { value: 750000000, label: "75,00,00,000/- (seventy five crore)" },
                                                { value: 1000000000, label: "100,00,00,000/- (one hundred crore)" },
                                              ];
                                              const filteredMaxBudgetOptionsbuy = leadinfo.budget_min
                                              ? buyBudgetOptions.filter((option) => option.value >= leadinfo.budget_min)
                                              : buyBudgetOptions;


  const selectlocation=()=>
    {
      document.getElementById("select_location").style.display="flex"
      document.getElementById("search_location1").style.display="none"

  
        
      document.getElementById("searchlocation").style.color="black"
      document.getElementById("searchlocation").style.backgroundColor="white"


      document.getElementById("selectlocation").style.backgroundColor="black"
      document.getElementById("selectlocation").style.color="white"
      document.getElementById("selectlocation").style.borderRadius="50px"
      document.getElementById("selectlocation").style.width="150px"
      document.getElementById("selectlocation").style.textAlign="center"
    
    

      
    }
    const searchlocation=()=>
      {
        document.getElementById("select_location").style.display="none"
        document.getElementById("search_location1").style.display="flex"
    
    
      
        document.getElementById("selectlocation").style.color="black"
        document.getElementById("selectlocation").style.backgroundColor="white"
 

        document.getElementById("searchlocation").style.backgroundColor="black"
        document.getElementById("searchlocation").style.color="white"
        document.getElementById("searchlocation").style.borderRadius="50px"
        document.getElementById("searchlocation").style.width="150px"
        document.getElementById("searchlocation").style.textAlign="center"
        
      }
            

        const config = {
                  headers: {
                    'Content-Type': 'multipart/form-data' // Set the Content-Type here
                  }
              }
              const leadinfodetails=async(e)=>
              {
                  e.preventDefault();
                  try {
                      const resp=await api.post('leadinfo',leadinfo,config)
                       if(resp.status===200)
                        {
                          Swal.fire({
                          title: '🎉 Lead created successfully...!',
                          html: `
                          <img src="https://cdn.vectorstock.com/i/500p/63/50/thumbs-up-smiley-face-icon-vector-10176350.jpg"
                          alt="Thumbs up" 
                          width="80" 
                          style="margin-bottom: 0px;"/>`,
                          width: '400px', // makes it small
                          padding: '1.2em',
                          showConfirmButton: true,
                          }).then((result) => {
                          if (result.isConfirmed) {
                              navigate('/leaddetails');
                              }
                          })
                        }
                    
                  } catch (error) {
                    console.log(error);
                    
                        Swal.fire({
                        title: 'Oops creating lead failed!',
                        html: `
                        <img src="https://i.pinimg.com/originals/53/3f/f7/533ff77ef582abbfa00ccf9080137304.gif"
                        alt="Sad face" 
                        width="80" 
                        style="margin-bottom: 0px;" />
                        <p style="font-size: 14px; margin: 0;">
                        ${error.response?.data?.message || 'Something went wrong. Please try again.'}
                        </p>
                        `,
                        width: '300px', // makes it small
                        padding: '1.2em',
                        showConfirmButton: true,
                        confirmButtonText: 'Okay',
                        confirmButtonColor: '#d33',
                        background: '#fff',
                        customClass: {
                        popup: 'small-swal',
                        }
                      });
                     
                  }
              }


  return (
    <div>
        <Sidebar1/>
        <Header1/>

 <div style={{marginLeft:"300px",marginTop:"100px",marginRight:"300px",padding:"20px",backgroundColor:"white",borderRadius:"8px"}}>
    
        <div className="row" id="leadinforequirment" style={{marginTop:"10px"}}>
            <div className="col-md-12" ><label className="labels" style={{fontSize:"20px",color:"blue"}}><u>Lead Requirment</u></label></div>
                        <div className="col-md-3"><label className="labels">Requirment</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setleadinfo({...leadinfo,requirment:e.target.value})}>
                            <option>{leadinfo.requirment}</option>
                            <option>---Select---</option>
                               {
                                requirment.map(item=>
                                    (
                                        <option>{item}</option>
                                    )
                                )
                               }
                                </select>
                                </div>
                                <div className="col-md-3"><label className="labels">Property Type</label>
                        
                                 <Select
                                 className="form-control form-control-sm" style={{border:"none"}}
                                  multiple
                                  value={leadinfo.property_type?leadinfo.property_type:[]}
                                  onChange={handleCategoryChange}
                                  renderValue={(selected) => selected.join(", ")}
                                >
                                  {options.property_type.map((cat) => (
                                    <MenuItem key={cat} value={cat}>
                                      <Checkbox checked={leadinfo?.property_type?.includes(cat)} />
                                      <ListItemText primary={cat} />
                                    </MenuItem>
                                  ))}
                                </Select>
                                </div>
                                
                                <div className="col-md-4"><label className="labels" style={{display:"inline-block"}}>Purpose</label><br></br>
                                <input type="radio" name="purpose" value={"End use"} style={{marginRight:"10px"}} onChange={(e)=>setleadinfo({...leadinfo,purpose:e.target.value})}/>End use<input type="radio" name="purpose" value={"Investor"} style={{marginLeft:"20px",marginRight:"10px"}} onChange={(e)=>setleadinfo({...leadinfo,purpose:e.target.value})}/>Investor
                                </div>
                                <div className="col-md-2"><label className="labels" >NRI</label><br></br>
                                <input type="checkbox" value={"Yes"} style={{marginRight:"10px"}} onChange={(e)=>setleadinfo({...leadinfo,nri:e.target.value})}/>Yes
                                </div>
                                <div className="col-md-6"><label className="labels">Sub Type</label>
                                
                                <Select
                                className="form-control form-control-sm" style={{border:"none"}}
                              multiple
                              value={leadinfo.sub_type}
                              onChange={handleSubcategoryChange}
                              renderValue={(selected) => selected.join(", ")}
                            >
                              {getAvailableSubcategories().map((sub) => (
                              <MenuItem key={sub} value={sub}>
                                <Checkbox checked={leadinfo.sub_type.includes(sub)} />
                                <ListItemText primary={sub} />
                              </MenuItem>
                            ))}
                            </Select>
                            </div>
                            
                            <div className="col-md-6"><label className="labels">Unit Type</label>
                            <Select
                                className="form-control form-control-sm" style={{border:"none"}}
                              multiple
                              value={leadinfo.unit_type}
                              onChange={handleUnitTypeChange}
                              renderValue={(selected) => selected.join(", ")}
                            >
                              {getAvailableunittype().map((sub) => (
                              <MenuItem key={sub} value={sub}>
                                <Checkbox checked={leadinfo.unit_type.includes(sub)} />
                                <ListItemText primary={sub} />
                              </MenuItem>
                            ))}
                            </Select>
                                </div>
                                {leadinfo.requirment === "Rent" && (
                                  <>
                                    <div id="rentbudgetmin" className="col-md-6">
                                      <label className="labels">Budget Min</label>
                                      <select
                                        className="form-control form-control-sm"
                                        onChange={(e) =>
                                          setleadinfo({ ...leadinfo, budget_min: e.target.value })
                                        }
                                        value={leadinfo.budget_min}
                                      >
                                        <option>---Select---</option>
                                        {budgetOptions.map((option) => (
                                          <option key={option.value} value={option.value}>
                                            {option.label}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
        
                                    <div id="rentbudgetmax" className="col-md-6">
                                      <label className="labels">Budget Max</label>
                                      <select
                                        className="form-control form-control-sm"
                                        onChange={(e) =>
                                          setleadinfo({ ...leadinfo, budget_max: e.target.value })
                                        }
                                        value={leadinfo.budget_max}
                                      >
                                        <option>{leadinfo.budget_max}</option>
                                        <option>---Select---</option>
                                        {filteredMaxBudgetOptions.map((option) => (
                                          <option key={option.value} value={option.value}>
                                            {option.label}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </>
                                )}
        
                                {leadinfo.requirment === "Buy" && (
                               <>
                                <div id="buybudgetmin" className="col-md-6"><label className="labels">Budget Min</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,budget_min:e.target.value})}>
                                <option>{leadinfo.budget_min}</option>
                                <option>---Select---</option>
                                {buyBudgetOptions.map((option) => (
                                          <option key={option.value} value={option.value}>
                                            {option.label}
                                          </option>
                                        ))}
                                </select></div>
                              
                              
                                <div id="buybudgetmax" className="col-md-6"><label className="labels">Budget Max</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,budget_max:e.target.value})}>
                               <option>{leadinfo.budget_max}</option>
                                <option>---Select---</option>
                                {filteredMaxBudgetOptionsbuy.map((option) => (
                                          <option key={option.value} value={option.value}>
                                            {option.label}
                                          </option>
                                        ))}
                                </select></div>
                                </>
                              )}
                                <div className="col-md-4"><label className="labels">Minimum Area</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,minimum_area:e.target.value})}>
                                <option>{leadinfo.minimum_area}</option>
                               <option>{leadinfo.minimum_area}</option>
                                <option>---Select---</option>
                                {areaoptions.map((option) => (
                                          <option key={option.value} value={option.value}>
                                            {option.label}
                                          </option>
                                        ))}
                                </select>
                                </div>
                                <div className="col-md-4"><label className="labels">Maximum Area</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,maximum_area:e.target.value})}>
                                <option>{leadinfo.maximum_area}</option>
                                <option>---Select---</option>
                                {filteredarea.map((option) => (
                                          <option key={option.value} value={option.value}>
                                            {option.label}
                                          </option>
                                        ))}
                        
                                </select></div>
                           
                                <div className="col-md-4"><label className="labels">Area Metric</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,area_metric:e.target.value})} >
                              <option>{leadinfo.area_metric}</option>
                              <option>---select---</option>
                                <option>Sq Yard</option>
                                <option>Marla</option>
                                <option>Acre</option>
                                <option>Sq Feet</option>
                                <option>Kanal</option>
                                </select></div> 
                                <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>Location Details</label></div>
                               
                                <div className="row" id="search_location" style={{border:"1px solid black",margin:"5px",padding:"10px",borderRadius:"8px"}}>
                                <div style={{display:"flex",gap:"50px",border:"1px solid gray",padding:"5px",borderRadius:"50px",marginLeft:"20%"}}>
                                     <div  id='selectlocation' onClick={selectlocation} style={{cursor:'pointer',fontWeight:"bold",backgroundColor:"black",color:"white",borderRadius:"50px",width:"150px",textAlign:"center",transition:"0.5s ease-out"}}>Select Location </div>
                                     <div  id='searchlocation' onClick={searchlocation} style={{cursor:'pointer',fontWeight:"bold",transition:"0.5s ease-out"}}>Search Loacation</div>
                                     
                                 </div>
        
                                          <div className="row" id="select_location" style={{margin:"5px",padding:"10px"}}>
                                                          <div className="col-md-5"><label className="labels">Country</label>
                                                          <select  className="form-control form-control-sm"  onChange={(e)=>setleadinfo({...leadinfo,country3:e.target.value})}>
                                                          <option>India</option>
                                                      {asianCountries.map((country, index) => (
                                                        <option key={index} value={country.toLowerCase().replace(/\s+/g, '-')}>
                                                          {country}
                                                        </option>
                                                      ))}
                                                            </select>
                                                          </div>
                                                         
                                                          <div className="col-md-5"><label className="labels">State</label><select type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,state3:e.target.value})}>
                                                          <option value="">--Select State--</option>
                                                        {states.map((state) => (
                                                          <option key={state} value={state}>
                                                            {state}
                                                          </option>
                                                        ))}
                                                            </select>
                                                          </div>
                                                          <div className="col-md-2"></div>
                                  
                                                          <div className="col-md-5"><label className="labels">City</label>
                                                      
                                                               <select
                                                      className="form-control form-control-sm"
                                                      value={leadinfo.city3}
                                                      onChange={(e)=>setleadinfo({...leadinfo,city3:e.target.value})}
                                                      disabled={!leadinfo.state3 || cities.length === 0}
                                                    >
                                                      <option value="">--Select City--</option>
                                                      {cities.map((city) => (
                                                        <option key={city} value={city}>
                                                          {city}
                                                        </option>
                                                      ))}
                                                    </select>
                                                          </div>
                                                         <div className="col-md-5">
                                                        <label className="labels">Area/Project</label>
                                                        <Select
                                                          className="form-control form-control-sm"
                                                          multiple
                                                          value={leadinfo.area_project?leadinfo.area_project:[]}
                                                          onChange={handleprojectchange}
                                                          style={{ border: 'none' }}
                                                          renderValue={(selected) => selected.join(', ')}
                                                          label="Area/Project"
                                                        >
                                                        
                                                          <MenuItem value="select-all">
                                                            <Checkbox checked={leadinfo?.area_project?.length === allproject.length} />
                                                            <ListItemText primary="--- Select All ---" />
                                                          </MenuItem>
                                  
                                                      
                                                          {allproject.map((project) => (
                                                            <MenuItem key={project} value={project}>
                                                              <Checkbox checked={leadinfo.area_project?.indexOf(project) > -1} />
                                                              <ListItemText primary={project} />
                                                            </MenuItem>
                                                          ))}
                                                        </Select>
                                                      </div> 
                                                          <div className="col-md-5">
                                                          <label className="labels">Block</label>
                                                          <Select
                                                            className="form-control form-control-sm"
                                                            multiple
                                                            value={leadinfo.block3?leadinfo.block3:[]}
                                                            onChange={handleallblockchange}
                                                            style={{ border: "none" }}
                                                            renderValue={(selected) => selected.join(', ')}
                                                            label="Block"
                                                          >
                                                          
                                                            <MenuItem value="select-all">
                                                              <Checkbox checked={leadinfo?.block3?.length === allblocks.length} />
                                                              <ListItemText primary="--- Select All ---" />
                                                            </MenuItem>
                                  
                                                         
                                                            {[...new Map(allblocks.map(item => [item.block_name, item])).values()].map((project) => (
                                                              <MenuItem key={project.block_name} value={project.block_name}>
                                                                <Checkbox checked={leadinfo.block3?.indexOf(project.block_name) > -1} />
                                                                <ListItemText primary={project.block_name} />
                                                              </MenuItem>
                                                            ))}
                                                          </Select>
                                                        </div> 
                                                   
                                                          <div className="col-md-5"><label className="labels">Specific Unit</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,specific_unit:e.target.value})}/></div>
                                                      </div>
        
                            <div className="row" id="search_location1" style={{margin:"5px",padding:"10px",display:"none"}}>
                                <div className="col-md-8"><label className="labels">Search Location</label><input type="text" className="form-control form-control-sm"   ref={inputRef} value={leadinfo.search_location} onChange={(e)=>setleadinfo({...leadinfo,search_location:e.target.value})}/></div>
                               <div className="col-md-2"></div>
                                <div className="col-md-2"><label className="labels" style={{visibility:"hidden"}}>Search</label><button className="form-control form-control-sm" onClick={getlocation}>Get</button></div>
                                <div className="col-md-8"><label className="labels">Street Address</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,street_address:e.target.value})}/></div>
                                <div className="col-md-4"><label className="labels">Range</label>
                                <select  className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,range:e.target.value})}>
                                <option>---select---</option>
                                <option value="1">Within 1 km.</option>
                                <option value="3">Within 3 km.</option>
                                <option value="5">Within 5 km.</option>
                                <option value="10">Within 10 km.</option>
                                <option value="15">Within 15 km.</option>
                                <option value="20">Within 20 km.</option>
                                <option value="25">Within 25 km.</option>
                                  </select>
                                </div>
                                {/* <div className="col-md-4"></div> */}
        
                            <div className="col-md-3"><label className="labels">City</label><input type="text" className="form-control form-control-sm" value={leadinfo.city2} onChange={(e)=>setleadinfo({...leadinfo,city2:e.target.value})}/></div>
                            <div className="col-md-3"><label className="labels">Area</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,area2:e.target.value})}/></div>
                            <div className="col-md-3"><label className="labels">Block</label><input type="text" className="form-control form-control-sm" value={leadinfo.block} onChange={(e)=>setleadinfo({...leadinfo,block:e.target.value})}/></div>
                            <div className="col-md-3"><label className="labels">Pin Code</label><input type="text" className="form-control form-control-sm" value={leadinfo.pincode2} onChange={(e)=>setleadinfo({...leadinfo,pincode2:e.target.value})}/></div>
                            
                            <div className="col-md-3"><label className="labels">Country</label><input type="text" className="form-control form-control-sm" value={leadinfo.country2} onChange={(e)=>setleadinfo({...leadinfo,country2:e.target.value})}/></div>
                            <div className="col-md-3"><label className="labels">State</label><input type="text" className="form-control form-control-sm" value={leadinfo.state2} onChange={(e)=>setleadinfo({...leadinfo,state2:e.target.value})}/></div>
                            <div className="col-md-3"><label className="labels">Lattitude</label><input type="text" className="form-control form-control-sm" value={leadinfo.lattitude} onChange={(e)=>setleadinfo({...leadinfo,lattitude:e.target.value})}/></div>
                            <div className="col-md-3"><label className="labels">Longitude</label><input type="text" className="form-control form-control-sm" value={leadinfo.longitude} onChange={(e)=>setleadinfo({...leadinfo,longitude:e.target.value})}/></div>
                            {/* <div className="col-md-4"><label className="labels">Location</label><input type="text" className="form-control form-control-sm" /></div> */}
                            </div>
                            
                            </div>
                            
                            <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>Other Details</label><hr style={{marginTop:"-5px"}}></hr></div>
                            
                           
                            <div className="col-md-4"><label className="labels">Facing</label>
                            <Select className="form-control form-control-sm" style={{border:"none"}}
                            multiple
                            value={leadinfo.facing?leadinfo.facing:facings}
                            onChange={handlefacingChange}
                            renderValue={(selected) => selected.join(', ')}
                        >
                          
                         <MenuItem value="select-all">
                            <Checkbox checked={facings.length === facing.length} />
                            <ListItemText
                              primary={'---select all---'}
                            />
                          </MenuItem>
                            {facing.map((name) => (
                                <MenuItem key={name} value={name}>
                                   <Checkbox checked={leadinfo?.facing?.includes(name)} />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                            
                        </Select>
                            </div>
                            <div className="col-md-4"><label className="labels">Road</label>
                            <Select className="form-control form-control-sm" style={{border:"none"}}
                            multiple
                            value={leadinfo.road?leadinfo.road:roads}
                            onChange={handleroadChange}
                            renderValue={(selected) => selected.join(', ')}
                        >
                        <MenuItem value="select-all">
                            <Checkbox checked={roads.length === road.length} />
                            <ListItemText
                              primary={'---select all---'} 
                                                          />
                          </MenuItem>
                            {road.map((name) => (
                                <MenuItem key={name} value={name}>
                                      <Checkbox checked={leadinfo?.road?.includes(name)} />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                            </div> 
        
                      <div className="col-md-4"><label className="labels">Direction</label>
                                              <Select className="form-control form-control-sm" style={{border:"none"}}
                                            multiple
                                            value={directions}
                                            onChange={handledirectionChange}
                                            renderValue={(selected) => selected.join(', ')}
                                        >
                                         
                                        <MenuItem value="select-all">
                                            <Checkbox checked={directions.length === direction.length} />
                                            <ListItemText
                                              primary={leadinfo?.direction || '---select all---'}
                                            />
                                          </MenuItem>
                                            {direction.map((name) => (
                                                <MenuItem key={name} value={name}>
                                                    <Checkbox checked={directions.indexOf(name) > -1} />
                                                    <ListItemText primary={name} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                           
                                            </div>
                        
        
                            <div className="col-md-4"><label className="labels">Funding</label>
                            <select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,funding:e.target.value})}>
                            <option>{leadinfo.funding}</option>
                            <option>---Select---</option>
                           {
                            funding.map(item=>
                                (
                                    <option>{item}</option>
                                )
                            )
                           }
                                </select>
                            </div>
                           
                            <div className="col-md-4"><label className="labels">Timeline</label>
                            <select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,timeline:e.target.value})}>
                            <option>{leadinfo.timeline}</option>
                            <option>---Select---</option>
                              {
                                timeline.map(item=>
                                    (
                                        <option>{item}</option>
                                    )
                                )
                              }
                                </select>
                            </div>
                          
                        
                           
                        
                            <div className="col-md-4"><label className="labels">Furnishing</label>
                            <select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,furnishing:e.target.value})}>
                            <option>{leadinfo.furnishing}</option>
                            <option>---Select---</option>
                               {
                                furnishing.map(item=>
                                    (
                                        <option>{item}</option>
                                    )
                                )
                               }
                                </select>
                            </div>     
                       <div className="col-md-4"><label className="labels">Property Unit Type</label>
                                           <Select className="form-control form-control-sm" style={{border:"none"}}
                                             multiple
                                             value={propertyunitstypes}
                                             onChange={handlepropertyunitstypesChange}
                                             renderValue={(selected) => selected.join(', ')}
                                         >
                                        
                                         <MenuItem value="select-all">
                                             <Checkbox checked={propertyunitstypes.length === propertyunittype.length} />
                                             <ListItemText
                                               primary={leadinfo?.unit_type2 || '---select all---'} 
                                             />
                                           </MenuItem>
                                             {propertyunittype.map((name) => (
                                                 <MenuItem key={name} value={name}>
                                                     <Checkbox checked={propertyunitstypes.indexOf(name) > -1} />
                                                     <ListItemText primary={name} />
                                                 </MenuItem>
                                             ))}
                                         </Select>
                                             </div>
        
                            <div className="col-md-4"><label className="labels">Transaction Type</label>
                            <select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,transaction_type:e.target.value})}>
                            <option>{leadinfo.transaction_type}</option>
                            <option>---Select---</option>
                             {
                                transaction_type.map(item=>
                                    (
                                        <option>{item}</option>
                                    )
                                )
                             }
                                </select>
                            </div>
        
                            
                             
                              {/* Conditionally render the progress bar */}
                              {leadinfo.transaction_type === "Flexiable" && (
                                <div className="col-md-8">
                                   <label className="labels">White Portion</label>
                                <div className="progress-container" style={{height:"20px"}} onMouseDown={handleMouseDown}>
                                  <div className="progress-bar"  style={{width: `${progress}%`,height:"20px",backgroundColor: progress >= 75 ? "green" : progress >= 50 ? "yellow" : "red",  }}/>
                                  <div className="progress-percentage">{Math.round(progress)}%</div>
                                </div>
                                </div>
                              )}
                          
        
        
                       <div className="col-md-4"><label className="labels">Send Matched Deal</label>
                            <Select className="form-control form-control-sm" style={{border:"none"}}
                            multiple
                            value={leadinfo.matched_deal?leadinfo.matched_deal:matchdeals}
                            onChange={handlematcheddealChange}
                            renderValue={(selected) => selected.join(', ')}
                        >
                           <MenuItem value="select-all">
                            <Checkbox checked={matchdeals.length === matchdeal.length} />
                            <ListItemText
                              primary={leadinfo?.matched_deal || '---select all---'} 
                            />
                          </MenuItem>
                            {matchdeal.map((name) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={matchdeals.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                            </div>  
                            <div className="col-md-8" style={{marginTop:"50px"}}></div>
                            <div className="col-md-2" style={{marginTop:"50px"}}>
                                  <button
                                    className="btn btn-sm"
                                    onClick={()=>navigate(-1)}
                                    style={{
                                        background: "linear-gradient(135deg,rgb(236, 42, 42),rgb(235, 111, 22))",
                                        color: "white",
                                        fontWeight: "600",
                                        fontSize: "14px",
                                        padding: "6px 16px",
                                        borderRadius: "6px",
                                        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
                                        border: "none",
                                        transition: "all 0.3s ease",
                                        marginLeft:"50px"
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.background = "linear-gradient(135deg,rgb(222, 106, 17),rgb(130, 10, 10))";
                                        e.target.style.transform = "scale(1.03)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.background = "linear-gradient(135deg,rgb(226, 75, 10),rgb(182, 221, 10))";
                                        e.target.style.transform = "scale(1)";
                                    }}
                                    >
                                    <i className="bi bi-handshake-fill me-2"></i>Cancel
                                    </button>
                            </div>
                            <div className="col-md-2" style={{marginTop:"50px"}}>
                                  <button
                                  onClick={leadinfodetails}
                                    className="btn btn-sm"
                                    style={{
                                        background: "linear-gradient(135deg, #28a745, #218838)",
                                        color: "white",
                                        fontWeight: "600",
                                        fontSize: "14px",
                                        padding: "6px 16px",
                                        borderRadius: "6px",
                                        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
                                        border: "none",
                                        transition: "all 0.3s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.background = "linear-gradient(135deg, #218838, #1e7e34)";
                                        e.target.style.transform = "scale(1.03)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.background = "linear-gradient(135deg, #28a745, #218838)";
                                        e.target.style.transform = "scale(1)";
                                    }}
                                    >
                                    <i className="bi bi-handshake-fill me-2"></i>Save
                                    </button>
                            </div>
                            
                        </div>
                 
       </div>
    </div>
  )
}

export default Leadrequirmentform
