import React from "react";
import Base from "../Base/Base";
import "./Add.css"
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { TextField } from "@mui/material";
import { AppStates } from "../Context/AppProvider";
import * as yup from 'yup';
import { useFormik } from "formik";



//field validation
export const fieldValidationSchema=yup.object({
  name:yup.string().required("Please enter the Name"),
  age:yup.number().required("Please enter the Age").min(21,"Please Enter Valid Age minimum Age is 21").max(40,"Please Enter Valid Age maximum Age is 50"),
  gender:yup.string().required("Please enter the Gender"),
  subject:yup.string().required("Please enter the Class"),
  bloodGroup:yup.string().required("Please enter the Blood Group")
})



function EditTeacher() {

  const {data2,setData2,ind,setInd}=AppStates();
  const history = useHistory();



  const {handleSubmit, values, setValues,handleChange,handleBlur,touched,errors}=useFormik({
    initialValues:{
      name:"",
      age:"",
      gender:"", 
      subject:"",
      bloodGroup:""
    },
    validationSchema:fieldValidationSchema,
    onSubmit:(newTeacherData)=>{
      console.log("onsubmit",newTeacherData)
      updateTeacher(newTeacherData)
    }
  })

  useEffect(() => {
    const editStudent = data2[ind]
 

    setValues({
      name:  editStudent.name,
      age:editStudent.age,
      gender:editStudent.gender,
      clas:editStudent.subject,
      bloodGroup:editStudent.bloodGroup
    })

  }, [data2, ind])

  async function updateTeacher() {
    
    const editedData={
      name : values.name,
      age : values.age,
      gender : values.gender,
      class : values.clas,
      bloodGroup : values.bloodGroup
    }
    data2[ind]=editedData;

    const response=await fetch(`https://645899734eb3f674df7800be.mockapi.io/teachers/${ind}`, {
      method:"PUT",
      body:JSON.stringify(editedData),
      headers:{
        "content-Type":"application/json"
      }
    }) 

    

    const newdata=await response.json();
      if(newdata){
        setData2([...data2]);
    history.push("/teacher")
      }

  }


  return (


    <Base
      heading={"Edit Data"}
    >



      <div className="container">
        {/* row*/}
        <div className="row add-container">


          <div className="col-12">
            {/* col add-form*/}
          <form className="container add-form" onSubmit={()=>(handleSubmit,history.push("/teacher"))}>
            <h1 className="add-heading"><b>Edit Student's Data</b></h1>
            
            <TextField
                fullWidth
                placeholder="Enter the Name"
                name="name"
                type="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div style={{color:"red"}}>{touched.name && errors.name ? errors.name : ""}</div>
              


              <TextField
                fullWidth
                placeholder="Enter the Age"
                name="age"
                type="age"
                value={values.age}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div style={{color:"red"}}>{touched.age && errors.age  ? errors.age : ""}</div>
              


              <TextField
                fullWidth
                placeholder="Enter the Gender"
                name="gender"
                type="gender"
                value={values.gender}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div style={{color:"red"}}>{touched.gender && errors.gender  ? errors.gender : ""}</div>
              


              <TextField
                fullWidth
                placeholder="Enter the Class"
                name="clas"
                type="clas"
                value={values.clas}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div style={{color:"red"}}>{touched.cals && errors.clas  ? errors.clas : ""}</div>
              

              <TextField
                fullWidth
                placeholder="Enter the Blood Group"
                name="bloodGroup"
                type="bloodGroup"
                value={values.bloodGroup}
                onChange={handleChange}
                onBlur={handleBlur}
              />

            <button className='btn btn-success'>Update</button>
          </form>

          </div>






        </div>
      </div>






    </Base>
  );




}



export default EditTeacher