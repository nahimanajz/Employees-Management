const employee = {
    allowedData: { 
        names:"jazzo" ,
        nid: "1230067890907590" ,
        phone:"780003510",
        email: "yuhoiu@test.try" ,
        dob: 2001 ,
        status: "active" ,
        position: "developer"
    },
    falseData: {
        names:"jazzo" ,
        nid: 1230067890907590 ,
        phone:"780003510",
        email: "yuhoiu@test.try",
        dob: 2003 ,
        status: "active" ,
        position: "developer"
    },
    alreadyExistEmail: {
        names:"jazzo" ,
        nid: "1230067890907590" ,
        phone:"780003510",
        email: "jazzosoft1@outloo.com",
        dob: 2002 ,
        status: "active" ,
        position: "developer"
    },
    alreadyExistPhone: {
        names:"jazzo" ,
        nid: "1230067890907590" ,
        phone:"780903588",
        email: "jazzosoft1@outloo.com",
        dob: 2002 ,
        status: "active" ,
        position: "developer"
    },
    alreadyExistNid: {
        names:"jazzo" ,
        nid: "1234567890987690" ,
        phone:"780903500",
        email: "jazzosoft1@outloo.com",
        dob: 2002 ,
        status: "active" ,
        position: "developer"
    }

}
export default employee;