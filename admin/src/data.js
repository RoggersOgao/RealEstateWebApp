import { FaBath, FaBed, FaLocationArrow } from "react-icons/fa"

export const userColumns = [
    { field: '_id', headerName: 'ID', width: 150 },
    {
        field: 'username',
        headerName: 'User Details',
        // sortable: false,
        width: 250,
        renderCell:(params)=>{
          return (
              <>
              <div className="cellwithimg">
                <div className="left">
                  {params.row.profile ? (
                    <img src={`http://localhost:5003/images/${params.row.profile}`} alt="" srcSet="" className="cellimg"/>
                  ) : (
                    <div className="profile">
                      <img src="/images/marble.jpg" alt="" />
                    </div>
                  )}
                </div>
                <div className="right">
                  <div className="top">
                {params.row.username}
                  </div>
                  <div className="bottom">
                {params.row.email}

                  </div>

                </div>
                
              </div>
              </>
          )
        }
      },
      {
        field:'nationalID',
        headerName:'National ID',
        width:150,
      },
      {
        field:'phoneNumber',
        headerName:"Phone Number",
        width:160,
      },
      {
        field:'otherNumber',
        headerName:'Alt Number',
        width:160
      }
]

export const propertyColumns = [
    { field: '_id', headerName: 'ID', width: 170 },
    {
        field: 'propertyName',
        headerName: 'Property Name',
        // sortable: false,
        width: 290,
        renderCell:(params)=>{
          return (
              <>
              <div className="cellwithimg">
                <div className="left">
                <img src={`http://localhost:5003/images/${params.row.img[0]}`} alt="" srcSet="" className="cellimg"/>
                </div>
                <div className="right">
                  <div className="top">
                      {params.row.propertyName}
                  </div>
                  <div className="bottom">
                    <div className="left">
                      <FaLocationArrow />{params.row.location}
                    </div>
                    <div className="middle">
                      <FaBath />{params.row.bathrooms}
                    </div>
                    <div className="right">
                      <FaBed className="icon"/> {params.row.bedrooms}
                    </div>
                  </div>
                </div>
              </div>
              </>
          )
        }
      },
      {
        field:'propertyState',
        headerName:'For Rent/ For Sale',
        width:170,
        renderCell:(params)=>{
            return(
                <>
                <div className="propertyStateCont">
                  <div className="top">
                  {params.row.propertyType}
                  </div>
                  <div className="bottom">
                    {params.row.propertyState}
                  </div>
                </div>
                </>
            )
        }
      },
      {
        field:'username',
        headerName:'Owner',
        width:120
      },
      {
        field:'price',
        headerName:'Price',
        width:120
      }
]


const userRows = [
    { 
        id: 1, 
        username: 'Snow', 
        img: "./images/avatar.jpg",
        status: "active",
        email: "lsnow@gmail.com",
        age: 35 
    },
    { 
        id: 2, 
        username: 'Lannister', 
        img: "./images/avatar.jpg",
        status: "active",
        email:"lcersei@gmail.com", 
        age: 42 
    },
    { 
        id: 3, 
        username: 'Lannister', 
        img:"./images/avatar.jpg",
        status: "active",
        email: "ljaime@gmail.com",
        age: 45 
    },
    { 
        id: 4, 
        username: 'Stark', 
        img: "./images/avatar.jpg",
        status:"passive",
        email:"starka@gmail.com",
        age: 16 
    },
    { 
        id: 5, 
        username: 'Targaryen', 
        img: "./images/avatar.jpg",
        status: "active",
        email: "targaryen@gmail.com",
        age: 20
    },
    { 
        id: 6, 
        username: 'Melisandre', 
        img: "./images/avatar.jpg",
        status:"active",
        email: "melisandre@gmail.com",
        age: 150 
    },
    { 
        id: 7, 
        username: 'Clifford', 
        img: "./images/avatar.jpg",
        status: "passive",
        email: "cliffordf@gmail.com",
        age: 44 
    },
    { 
        id: 8, 
        username: 'Frances', 
        img: "./images/avatar.jpg",
        status: "active",
        email: "francesr@gmail.com",
        age: 36 
    },
    { 
        id: 9, 
        username: 'Roxie',
        img: "./images/avatar.jpg",
        status:"active",
        email:"roxieharvey@gmail.com",
        age: 65 
    },
        
]

export default userRows