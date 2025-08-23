import { logDOM } from '@testing-library/react'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import api from "../api";

function Projectpreview() {

    const location=useLocation()
    const id=location.state 
 
 
    const[project,setproject]=useState([])
    useEffect(()=>
    {
        fetchproject()
    },[id])

    const fetchproject=async()=>
    {
        try {
            const resp=await api.get(`viewprojectbyid/${id}`)
            setproject(resp.data.project)
            
        } catch (error) {
            console.log(error);
            
        }
    }

    
    const [fullscreenImage, setFullscreenImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track current image index in fullscreen mode
  const [isFullscreen, setIsFullscreen] = useState(false); // To toggle fullscreen mode visibility

  // Handle the click on the image to set it in fullscreen
  const handleImageClick = (image, index) => {
    setFullscreenImage(image);
    setCurrentImageIndex(index);
    setIsFullscreen(true); // Open fullscreen mode
  };

  // Close the fullscreen view
  const handleCloseModal = () => {
    setIsFullscreen(false);
  };

  // Handle the "Next" button click to move to the next image
  const handleNextClick = () => {
    const allImages = project.add_unit.flatMap(unit => unit.preview); // Get all preview images across all units
    const nextIndex = (currentImageIndex + 1) % allImages.length; // Cycle through images
    setCurrentImageIndex(nextIndex);
    setFullscreenImage(allImages[nextIndex]); // Update the current fullscreen image
  };

  // Ensure project and add_unit are available and the preview array exists
  const allImages = project.add_unit?.flatMap(unit => unit.preview); 

  const cloudinaryPdfUrl = 'https://drive.google.com/file/d/1MNZZ7tyy9Fb2QMoKqv2Z4hyAjmzVF7i9/view?usp=drive_link';
  

    
    
  return (
    <div style={{overflow:"hidden",paddingLeft:"120px",paddingRight:"120px",paddingTop:"50px",  backgroundImage: 'url(https://www.zmo.ai/wp-content/uploads/2023/09/powerpoint-slide-with-white-background-SB02298-min-scaled.jpg)',backgroundSize: 'cover',backgroundRepeat:"repeat",height:"auto"}}>
  
  <h2 style={{fontFamily:"times-new-roman"}}>{project.name}</h2>
  <h3>{project.category}</h3>
  <div style={{display:"inline-flex"}}>
  <img src='https://i.pinimg.com/474x/ac/c2/91/acc291a20c55c01932ced422bc48e602.jpg' style={{height:"20px"}}></img>
  <h5>{project.location}</h5>
  </div>
 

{allImages && allImages.length > 0 ? (
  <div style={{marginTop:"20px"}}>
    {/* Display all images from all units in a grid */}
    
      {allImages.map((image, index) => (
      
        <img
          key={index}
          src={image}
          alt={`Preview ${index}`}
          onClick={() => handleImageClick(image, index)} // Click to open in fullscreen
          style={{
            backgroundColor:"gray",
            width: '300px',
            height: '200px', // Set a consistent size for images
            objectFit: 'cover',
            cursor: 'pointer',
            marginLeft:"5px"
          }}
        />
       
      ))}
   </div>
 
) : (
  <p>No images available in the project</p>
)}

{/* Fullscreen Modal for the image */}
{isFullscreen && fullscreenImage && (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}
    onClick={handleCloseModal} // Close modal when clicked outside the image
  >
    <div style={{ textAlign: 'center' }}>
      {/* Display the fullscreen image */}
      <img
        src={fullscreenImage}
        alt="Fullscreen preview"
        style={{
          maxWidth: '90%',
          maxHeight: '90%',
          objectFit: 'contain',
          cursor: 'pointer',
        }}
      />

      {/* Next Button (Arrow) */}
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={handleNextClick}
          style={{
            padding: '10px',
            fontSize: '16px',
            backgroundColor: '#fff',
            color: '#000',
            border: 'none',
            cursor: 'pointer',
            marginLeft: '20px',
          }}
        >
          <span style={{ fontSize: '20px', fontWeight: 'bold' }}>&#8594;</span> {/* Right Arrow */}
        </button>
      </div>
    </div>
  </div>
)}

<div style={{marginTop:"40px"}}>
    <div className='row' >
        <div className='col-md-8' style={{height:"500px",overflowY:"scroll",marginBottom:"50px"}}>
            <div className='row' style={{width:"100%"}}>
                    <div className='col-md-3'>
                    <label className='labels' style={{marginLeft:"5px",fontSize:"12px"}}><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThjoHSjWp5fS5Vx1Hs_FzU5AA2Yz95xsdzGQ&s' style={{height:"20px"}}></img>Project Status</label>
                    <p style={{fontSize:"12px",fontWeight:"bold",marginLeft:"20px"}}>{project.status}</p>
                    </div>

                    <div className='col-md-3'>
                    <label className='labels' style={{marginLeft:"5px",fontSize:"12px"}}><img src='https://www.clipartmax.com/png/small/163-1630210_how-to-change-your-account-password-password-icon-png-green.png' style={{height:"20px"}}></img>Possession Date</label>
                    <p style={{fontSize:"12px",fontWeight:"bold",marginLeft:"20px"}}>{project.possession}</p>
                    </div>

                    <div className='col-md-3'>
                    <label className='labels' style={{marginLeft:"5px",fontSize:"12px"}}><img src='https://png.pngtree.com/png-vector/20230405/ourmid/pngtree-compass-icon-vector-compass-icon-compass-symbol-aiming-vector-web-vector-png-image_50791344.jpg' style={{height:"20px"}}></img>Facings</label>
                    <p style={{ fontSize: "12px", fontWeight: "bold",marginLeft:"20px",wordWrap: "break-word" }}>
                        {project.add_unit?.map((item, index) => (
                            <span key={index}>{item.direction}</span>
                        ))}
                        </p>
                    </div>

                    <div className='col-md-3'>
                    <label className='labels' style={{marginLeft:"5px",fontSize:"12px"}}><img src='https://cdn-icons-png.flaticon.com/512/5337/5337108.png' style={{height:"20px"}}></img>Project Sub-Type</label>
                    <p style={{fontSize:"12px",fontWeight:"bold",marginLeft:"20px",wordWrap: "break-word"}}>{project.sub_category?.join(',')}</p>
                    </div>

                    <div className='col-md-3'>
                    <label className='labels' style={{marginLeft:"5px",fontSize:"12px"}}><img src='https://cdn-icons-png.flaticon.com/512/1504/1504898.png' style={{height:"20px"}}></img>Project Land Area</label>
                    <p style={{ fontSize: "12px", fontWeight: "bold",marginLeft:"20px" }}>
                        {project.land_area?.map((item, index) => (
                            <span key={index}>{item} {project.measurment1}</span>
                        ))}
                        </p>
                    </div>

                    <div className='col-md-3'>
                    <label className='labels' style={{marginLeft:"5px",fontSize:"12px"}}><img src='https://www.citypng.com/public/uploads/preview/calendar-date-vector-flat-icon-png-7017516949739211umvfiwzkw.png' style={{height:"20px"}}></img>Start Date</label>
                    <p style={{fontSize:"12px",fontWeight:"bold",marginLeft:"20px"}}>{project.launched_on}</p>
                    </div>

                    <div className='col-md-3'>
                    <label className='labels' style={{marginLeft:"5px",fontSize:"12px"}}><img src='https://cdn-icons-png.flaticon.com/256/11339/11339990.png' style={{height:"20px"}}></img>End Date</label>
                    <p style={{fontSize:"12px",fontWeight:"bold",marginLeft:"20px"}}>{project.expected_competion}</p>
                    </div>

                    <div className='col-md-3'>
                    <label className='labels' style={{marginLeft:"5px",fontSize:"12px"}}><img src='https://cdn-icons-png.flaticon.com/512/2642/2642358.png' style={{height:"20px"}}></img>Bedrooms</label>
                    <p style={{fontSize:"12px",fontWeight:"bold",marginLeft:"20px"}}></p>
                    </div>

                    <div className='col-md-12'><label className='labels'><u>About Project</u></label>
                    <p style={{fontSize:"12px",fontWeight:"bold",marginLeft:"20px",textAlign:"left"}}>
                    Located in the thriving Hebbal area, Four Seasons Private Residences at Embassy One is a premium residential complex.
                     Hebbal is the home to many IT companies and has witnessed rapid development,
                      making it a prime location. The society has great connectivity with Bellary Road, 
                      Bengaluru International Airport, and Hebbal Railway Station along with Yeshwantpur Metro.
                       The society offers an array of amenities, including a championship golf course, multiple swimming pools,
                        sports facilities, and a business centre.
                    </p>
                    </div>

                    <div className='col-md-12'><label className='labels'><u>Associated Banks</u></label>
                    <marquee direction="left" style={{ fontSize: "12px", fontWeight: "bold", marginLeft: "20px", textAlign: "left" }}>
                    {project.approved_bank?.map((bank, index) => (
                        <span key={index} style={{ marginRight: '15px' }}>
                        {bank === "State Bank of India" ? (
                            <>
                            <img 
                                src="https://www.freepnglogos.com/uploads/sbi-logo-png/state-bank-india-sbi-prelims-april-slot-analysis-archives-12.png" 
                                alt="SBI Icon" 
                                style={{ width: '150px', height: '50px', verticalAlign: 'middle', marginRight: '5px' }} 
                            />
                          
                            </>
                        ) : bank === "Axis Bank" ? (
                            <>
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Axis_Bank_logo.svg/2560px-Axis_Bank_logo.svg.png" 
                                alt="SBI Icon" 
                                style={{ width: '150px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }} 
                            />
                          
                            </>
                        ) : bank === "ICICI Bank" ? (
                            <>
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/ICICI_Bank_Logo.svg/2560px-ICICI_Bank_Logo.svg.png" 
                                alt="SBI Icon" 
                                style={{ width: '150px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }} 
                            />
                          
                            </>
                        ) :(
                            bank
                        )}
                        </span>
                    ))}
                    </marquee>

                    </div>

                    <div className='col-md-12'><hr></hr></div>

                    <div className='col-md-12'><u>Unit Range</u></div>
                    <div className='col-md-12' style={{display:"inline-flex",gap:"20px",marginTop:"10px",flexWrap:"wrap"}}>
                        {
                            project.add_unit?.map((unit)=>
                            (
                               
                               <button className='form-control form-control-sm' style={{width:"100px",}}>{unit.unit_no}</button>
                             
                            ))
                        }
                    </div>

                    <div className='col-md-12' style={{marginTop:"20px"}}><u>Amenities</u></div>
                    <div className='col-md-12' style={{marginTop:"20px",marginLeft:"20px",fontWeight:"bold",marginBottom:"10px",color:"blue"}}><u>Basic</u></div>
                        
                    {
                    project.basic_aminities?.map((item, index) => (
                        <div className='col-md-2' key={index}>
                        {item === "24x7 Water Supply" ? (
                            <>
                            <img 
                                src="https://training.leadrat.com/assets/amenities-icons/waterSupply.svg" 
                                alt="Water Supply Icon" 
                                style={{ width: '50px', height: '50px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Car Parking" ? (
                            <>
                            <img 
                                src="	https://training.leadrat.com/assets/amenities-icons/CAR%20parking.svg" 
                                alt="Water Supply Icon" 
                                style={{ width: '50px', height: '50px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Intercom" ? (
                            <>
                            <img 
                                src="https://training.leadrat.com/assets/amenities-icons/intercom.svg" 
                                alt="Water Supply Icon" 
                                style={{ width: '50px', height: '50px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Multi-Purpose Hall" ? (
                            <>
                            <img 
                                src="https://training.leadrat.com/assets/amenities-icons/multipurpose%20hall.svg" 
                                alt="Water Supply Icon" 
                                style={{ width: '50px', height: '50px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Municipal Water Supply" ? (
                            <>
                            <img 
                                src="https://training.leadrat.com/assets/amenities-icons/waterSupply.svg" 
                                alt="Water Supply Icon" 
                                style={{ width: '50px', height: '50px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Garbage Management System" ? (
                            <>
                            <img 
                                src="https://training.leadrat.com/assets/amenities-icons/garbage.svg" 
                                alt="Water Supply Icon" 
                                style={{ width: '50px', height: '50px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Fire Fighting System" ? (
                            <>
                            <img 
                                src="https://cdn.iconscout.com/icon/premium/png-256-thumb/fire-protection-1724182-1464021.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Visitor Car Parking" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/3420/3420275.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Earthquake Resistance" ? (
                            <>
                            <img 
                                src="https://img.icons8.com/?size=160&id=wwGvmjaFovuy&format=png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Lift" ? (
                            <>
                            <img 
                                src="https://cdn.iconscout.com/icon/premium/png-256-thumb/lift-2028518-1712621.png?f=webp&w=256" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Maintenance Staff" ? (
                            <>
                            <img 
                                src="https://icons.veryicon.com/png/o/file-type/color-administrative-simple-icon/maintenance-worker.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Power Supply" ? (
                            <>
                            <img 
                                src="https://static.vecteezy.com/system/resources/previews/032/534/022/non_2x/uninterrupted-power-supply-icon-vector.jpg" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Air Condition" ? (
                            <>
                            <img 
                                src="https://previews.123rf.com/images/ylivdesign/ylivdesign2110/ylivdesign211005077/175844307-air-conditioner-icon-outline-air-conditioner-vector-icon-color-flat-isolated.jpg" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Security" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/9767/9767122.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Bike Parking" ? (
                            <>
                            <img 
                                src="https://i.fbcd.co/products/resized/resized-750-500/2-aeb047d180a347464eba71fd1b87d9889c9d39b7ce48329fe258e4dde18a6754.jpg" 
                                alt="Water Supply Icon" 
                                style={{ width: '50px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Others" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/8382/8382949.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '50px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :(
                            item
                        )}
                        </div>
                    ))
                    }

                       

                    <div className='col-md-12' style={{marginTop:"20px",marginLeft:"20px",fontWeight:"bold",marginBottom:"10px",color:"blue"}}><u>Nearby</u></div>
                    
                    {
                    project.nearby_aminities?.map((item, index) => (
                        <div className='col-md-2' key={index}>
                        {item.destination === "Bus Stop" ? (
                            <>
                            <img 
                                src="https://training.leadrat.com/assets/amenities-icons/Bus%20stop.svg" 
                                alt="Water Supply Icon" 
                                style={{ width: '50px', height: '50px', verticalAlign: 'middle', marginRight: '5px' }}/>
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item.destination}</p>
                            </>
                        ) : 
                        item.destination === "Atm" ? (
                            <>
                            <img 
                                src="https://training.leadrat.com/assets/amenities-icons/ATM.svg" 
                                alt="Water Supply Icon" 
                                style={{ width: '50px', height: '50px', verticalAlign: 'middle', marginLeft: '-10px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item.destination}</p>
                            </>
                        ) : item.destination === "Airport" ? (
                            <>
                            <img 
                                src="https://training.leadrat.com/assets/amenities-icons/Airport.svg" 
                                alt="Water Supply Icon" 
                                style={{ width: '50px', height: '50px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item.destination}</p>
                            </>
                        ) :  item.destination === "Bank" ? (
                            <>
                            <img 
                                src="https://training.leadrat.com/assets/amenities-icons/bank.svg" 
                                alt="Water Supply Icon" 
                                style={{ width: '50px', height: '50px', verticalAlign: 'middle', marginLeft: '-10px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item.destination}</p>
                            </>
                        ) :  item.destination === "Church" ? (
                            <>
                            <img 
                                src="https://training.leadrat.com/assets/amenities-icons/church.svg" 
                                alt="Water Supply Icon" 
                                style={{ width: '50px', height: '50px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item.destination}</p>
                            </>
                        ) :  item.destination === "Mosque" ? (
                            <>
                            <img 
                                src="https://training.leadrat.com/assets/amenities-icons/Mosque.svg" 
                                alt="Water Supply Icon" 
                                style={{ width: '50px', height: '50px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item.destination}</p>
                            </>
                        ) :  item.destination === "Park" ? (
                            <>
                            <img 
                                src="https://training.leadrat.com/assets/amenities-icons/park.svg" 
                                alt="Water Supply Icon" 
                                style={{ width: '50px', height: '50px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item.destination}</p>
                            </>
                        ) : item.destination === "Railway Station" ? (
                            <>
                            <img 
                                src="https://training.leadrat.com/assets/amenities-icons/Railway%20station.svg" 
                                alt="Water Supply Icon" 
                                style={{ width: '50px', height: '50px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item.destination}</p>
                            </>
                        ) : item.destination === "Restaurants" ? (
                            <>
                            <img 
                                src="https://training.leadrat.com/assets/amenities-icons/Restaurant.svg" 
                                alt="Water Supply Icon" 
                                style={{ width: '50px', height: '50px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item.destination}</p>
                            </>
                        ) : item.destination === "School" ? (
                            <>
                            <img 
                                src="https://training.leadrat.com/assets/amenities-icons/school.svg" 
                                alt="Water Supply Icon" 
                                style={{ width: '50px', height: '50px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item.destination}</p>
                            </>
                        ) :  item.destination === "Super Market" ? (
                            <>
                            <img 
                                src="https://training.leadrat.com/assets/amenities-icons/Supermarket.svg" 
                                alt="Water Supply Icon" 
                                style={{ width: '50px', height: '50px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item.destination}</p>
                            </>
                        ) :  item.destination === "Temple" ? (
                            <>
                            <img 
                                src="https://training.leadrat.com/assets/amenities-icons/Temple.svg" 
                                alt="Water Supply Icon" 
                                style={{ width: '50px', height: '50px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item.destination}</p>
                            </>
                        ) :   (
                        
                            item.destination
                        )}
                        </div>
                    ))
                    }

                    
                    <div className='col-md-12' style={{marginTop:"20px",marginLeft:"20px",fontWeight:"bold",marginBottom:"10px",color:"blue"}}><u>Featured</u></div>

                    {
                    project.features_aminities?.map((item, index) => (
                        <div className='col-md-2' key={index}>
                        {item === "Seniour Citizen Corner" ? (
                            <>
                            <img 
                                src="https://www.shutterstock.com/image-vector/elderly-person-icon-vector-illustration-260nw-2406157383.jpg" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}/>
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : 
                        item === "Worship Place" ? (
                            <>
                            <img 
                                src="https://www.svgrepo.com/show/396643/hindu-temple.svg" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "HAVC System" ? (
                            <>
                            <img 
                                src="https://static.vecteezy.com/system/resources/previews/027/362/165/non_2x/hvac-technician-icon-free-vector.jpg" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold",}}>{item}</p>
                            </>
                        ) :  item === "Cricket Pitch" ? (
                            <>
                            <img 
                                src="https://cdn.iconscout.com/icon/premium/png-256-thumb/cricket-pitch-1484568-1256595.png?f=webp&w=256" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Two Tier Security" ? (
                            <>
                            <img 
                                src="https://cdn3d.iconscout.com/3d/premium/preview/home-security-3d-icon-download-in-png-blend-fbx-gltf-file-formats--secure-house-protection-safe-cyber-pack-icons-4468790.png?f=webp&h=700" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Cafeteria" ? (
                            <>
                            <img 
                                src="https://img.lovepik.com/png/20231122/restaurant-icon-with-table-and-chairs-in-the-center-vector_668376_wh860.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Car Washing Area" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/1144/1144264.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "No Common Wall" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/8233/8233286.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Driver Dormitory" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/3663/3663802.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "EPABX System" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/1555/1555391.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "CCTV" ? (
                            <>
                            <img 
                                src="https://img.pikbest.com/origin/09/22/57/168pIkbEsTePr.png!sw800" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Gymaasium" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/6750/6750831.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Garden" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/366/366969.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Power Back Up" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/9163/9163699.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}/>
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : 
                        item === "Party Lawn" ? (
                            <>
                            <img 
                                src="https://cdn.iconscout.com/icon/premium/png-256-thumb/party-1969058-1666648.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Gazebo" ? (
                            <>
                            <img 
                                src="https://png.pngtree.com/png-vector/20240529/ourmid/pngtree-an-isometric-image-of-an-old-gazebo-vector-png-image_6963273.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold",}}>{item}</p>
                            </>
                        ) :  item === "Cold Storage" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.freepik.com/512/16133/16133272.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Solar Water Heater" ? (
                            <>
                            <img 
                                src="https://cdn.iconscout.com/icon/premium/png-256-thumb/solar-water-heating-3762071-3138631.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Jogging Track" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/5024/5024659.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "DTH Connection" ? (
                            <>
                            <img 
                                src="https://cdn.iconscout.com/icon/free/png-256/free-dth-icon-download-in-svg-png-gif-file-formats--direct-to-home-signal-network-dish-antenna-payment-e-wallet-pack-commerce-shopping-icons-1538051.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Three Tier Security" ? (
                            <>
                            <img 
                                src="https://png.pngtree.com/png-vector/20250118/ourlarge/pngtree-set-of-colorful-shield-and-padlock-icons-symbolizing-security-protection-privacy-png-image_15263816.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Smoking Area" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/9830/9830826.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Spa & Saloon" ? (
                            <>
                            <img 
                                src="https://w7.pngwing.com/pngs/507/668/png-transparent-free-beauty-icons-thumbnail.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Solar Power" ? (
                            <>
                            <img 
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_IQQAexEDoqwU9PhHze3WLx28zm7TG2UrGA&s" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Video Door Phone" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.freepik.com/512/8957/8957802.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Utility Shop" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/438/438560.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Steam Room" ? (
                            <>
                            <img 
                                src="https://png.pngtree.com/png-vector/20190701/ourmid/pngtree-steam-room-icon-for-your-project-png-image_1533387.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}/>
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : 
                        item === "Amphi Theatre" ? (
                            <>
                            <img 
                                src="https://png.pngtree.com/png-vector/20230729/ourmid/pngtree-auditorium-clipart-theatre-stage-with-a-flat-design-cartoon-vector-png-image_6804730.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Private Car Parking" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/9343/9343062.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold",}}>{item}</p>
                            </>
                        ) :  item === "Guest Room" ? (
                            <>
                            <img 
                                src="https://cdn.iconscout.com/icon/premium/png-256-thumb/guest-bedroom-9851918-7997063.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Internet" ? (
                            <>
                            <img 
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ17fzKIdVl4osjm2tvTFj7rbnzq5Z_EqYcRQ&s" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Kids Play area" ? (
                            <>
                            <img 
                                src="https://png.pngtree.com/png-vector/20241112/ourmid/pngtree-kids-play-area-png-image_14404049.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Barbeque Facility" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/9229/9229279.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Basket Ball Court" ? (
                            <>
                            <img 
                                src="https://icon2.cleanpng.com/20231227/csv/transparent-icon-basketball-hoop-square-hoop-metal-hoop-basketball-thrown-into-white-square-1710952309481.webp" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Skating Rink" ? (
                            <>
                            <img 
                                src="https://w7.pngwing.com/pngs/699/173/png-transparent-ice-skating-ice-rink-ice-skates-figure-skating-ice-skates-thumbnail.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Socity Office" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.freepik.com/512/9665/9665162.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Squash Court" ? (
                            <>
                            <img 
                                src="https://www.shutterstock.com/image-vector/squash-sport-graphic-player-action-260nw-2205017303.jpg" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Waiting Longue" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/914/914622.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Yoga And Meditation Center" ? (
                            <>
                            <img 
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2lTTir0neITuvoGNnXJTHWwVV6Xl6KYPPjg&s" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Water Softener" ? (
                            <>
                            <img 
                                src="https://img.freepik.com/premium-vector/water-softening-icon-vector-image-can-be-used-water-treatment_120816-368505.jpg" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}/>
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : 
                        item === "Swipe Card Entry" ? (
                            <>
                            <img 
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSukLbdxHWmFfo_VWt0itrS1Jot2z52Gp7uUA&s" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Health Facilities" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/4646/4646577.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold",}}>{item}</p>
                            </>
                        ) :  item === "Library" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/9043/9043296.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Day Care Center" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/3212/3212937.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Reception" ? (
                            <>
                            <img 
                                src="https://static.vecteezy.com/system/resources/previews/033/142/149/non_2x/color-icon-for-reception-vector.jpg" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Shiping Stores" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/5207/5207228.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Laundry Room" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/6209/6209752.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Indoor Games" ? (
                            <>
                            <img 
                                src="https://static.vecteezy.com/system/resources/previews/020/040/449/non_2x/hand-drawn-set-of-board-game-elements-for-adults-and-children-color-simple-icons-for-gambling-table-games-and-entertainment-illustration-isolated-on-white-background-vector.jpg" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Piped Lpg Connection" ? (
                            <>
                            <img 
                                src="https://png.pngtree.com/png-vector/20221007/ourmid/pngtree-illustration-of-shut-off-valve-on-natural-gas-pipe-png-image_6263282.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Confrence Or Meeting Room" ? (
                            <>
                            <img 
                                src="https://cdn.iconscout.com/icon/premium/png-256-thumb/meeting-room-2156306-1811746.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Badminton Court" ? (
                            <>
                            <img 
                                src="https://w7.pngwing.com/pngs/418/175/png-transparent-game-sport-badminton-racquet-shuttlecock-girl-court-colored-outline-icon-thumbnail.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Sauna Bath" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.freepik.com/512/5906/5906324.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Rain Water Harvesting" ? (
                            <>
                            <img 
                                src="https://static.vecteezy.com/system/resources/previews/026/114/716/non_2x/rainwater-harvesting-environmental-color-icon-illustration-vector.jpg" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold",}}>{item}</p>
                            </>
                        ) :  item === "Jacuzzi" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.freepik.com/512/7969/7969407.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Massage Parlor" ? (
                            <>
                            <img 
                                src="https://static.vecteezy.com/system/resources/previews/015/074/026/non_2x/spa-massage-icon-color-outline-vector.jpg" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Tution Room" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/3492/3492080.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Restaurant" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/1376/1376387.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Tennis Court" ? (
                            <>
                            <img 
                                src="https://png.pngtree.com/png-vector/20220711/ourmid/pngtree-tennis-court-png-image_5823087.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Club House" ? (
                            <>
                            <img 
                                src="https://cdn.iconscout.com/icon/free/png-256/free-club-building-icon-download-in-svg-png-gif-file-formats--clubhouse-bar-pub-modern-city-buildings-pack-icons-2125068.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Swimming Pool" ? (
                            <>
                            <img 
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaPEVvUldQc8LjAOPoRn2lj8a8LEuBs8FQZg&s" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Wi-Fi" ? (
                            <>
                            <img 
                                src="https://purepng.com/public/uploads/large/purepng.com-wifi-iconwifi-iconwifiiconwireless-connection-1701528436244t3ged.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Mini Theater" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/708/708883.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Modular Kitchen" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/3095/3095310.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Cycliing Track" ? (
                            <>
                            <img 
                                src="https://icons.veryicon.com/png/o/business/color-olympic-events-flat-icon/cycling-track-1.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Outdoor Games" ? (
                            <>
                            <img 
                                src="https://img.pikbest.com/origin/10/07/01/29wpIkbEsTTxe.jpg!w700wp" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :(
                        
                            <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                        )}
                        </div>
                    ))
                    }

                    <div className='col-md-12' style={{marginTop:"20px"}}><u>Project Walk-through</u>
                    {
    project.add_unit?.map((unit, index) => (
      // Check if 'url' is an array for the current 'unit' object
      Array.isArray(unit.url) && unit.url.length > 0 ? (
        unit.url.map((item, urlIndex) => (
          <iframe 
            key={`${index}-${urlIndex}`} // Unique key for each iframe
            width="873" 
            height="491" 
            src={item}  
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen 
          />
        ))
      ) : (
        <p key={index}>No URLs available for this project walk-through.</p>
      )
    ))
  }

  
                    
                    
                    </div>


            </div>
        </div>

        <div className='col-md-4' style={{height:"500px",overflowY:"scroll",marginBottom:"50px"}}>
            <div className='row' style={{border:"1px solid gray", borderRadius:"5px", backgroundColor:"white",padding:"10px",marginLeft:"20px"}}>
                <div className='col-md-12' style={{fontWeight:"bold"}}>Suraj Kumar</div>
                <div className='col-md-12' style={{fontSize:"12px",marginBottom:"20px"}}>+919991000570</div>
            <div className="col-md-6"><label className="labels" style={{fontWeight:"bold",fontSize:"12px"}}>Name</label><input type="text" placeholder='alex dow' required="true" className="form-control form-control-sm"/></div>
            <div className="col-md-6"><label className="labels" style={{fontWeight:"bold",fontSize:"12px"}}>Phone No.</label><input type="text" placeholder='7047752734'  required="true" className="form-control form-control-sm"/></div>
            <div className="col-md-6"><label className="labels" style={{fontWeight:"bold",fontSize:"12px"}}>Email</label><input type="text" placeholder='ex. alex@gmail.com' required="true" className="form-control form-control-sm"/></div>
            <div className="col-md-6"><label className="labels" style={{fontWeight:"bold",fontSize:"12px"}}>Budget</label><input type="text" placeholder='ex. 400000'  required="true" className="form-control form-control-sm"/></div>

            <div className="col-md-6"><label className="labels" style={{fontWeight:"bold",fontSize:"12px"}}>Unit Name</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setproject({...project,developer_name:e.target.value})}>
                              <option>---Select---</option>
                              {
                                project.add_unit?.map((item)=>
                                (
                                  <option>{item.unit_no}</option>
                                ))
                              }
                        </select>
                        </div>
                        <div className='col-md-6'></div>
                    
                    <div className='col-md-12' style={{display:"inline-flex"}}>
                        <input type='checkbox' style={{ transform: 'scale(1.5)' }}/><p style={{fontSize:"12px",paddingTop:"15px",marginLeft:"10px"}}>I agree with the <span><u>Terms & Privecy Policy</u></span></p>
                    </div>

                    <div className='col-md-12'>
                        <button className='form-control form=control-sm' style={{borderRadius:"5px"}}>Enquire Now</button>
                    </div>
            </div>

            <div className='row' style={{border:"1px solid gray", borderRadius:"5px", backgroundColor:"white",padding:"10px",marginLeft:"20px",marginTop:"20px"}}>
                <div className='col-md-12'><u>Brochure</u></div>
                <div className='col-md-4' style={{height:"150px",backgroundColor:"#F2F0EF"}}>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png' style={{height:"130px",width:"150px",paddingTop:"20px"}}></img>
                </div>
                <div className='col-md-8'></div>
                <div className='col-md-12' style={{display:"inline-flex"}}>
                {/* Button to trigger PDF download from Cloudinary */}
                <a href={cloudinaryPdfUrl} download="Brochure.pdf">
                  <p style={{fontSize:"12px"}}>download brochure ... <button style={{border:"none"}}><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPWqiIGw7fFyNP0vI_nxHj-0xUsLjPeY4Riw&s' style={{height:"20px"}}></img></button></p>
                </a>
                </div>
            </div>

        </div>

</div>
</div>
</div>

  )
}

export default Projectpreview
