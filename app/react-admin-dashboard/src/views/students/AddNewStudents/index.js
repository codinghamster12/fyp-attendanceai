
import React, {useState} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFade,
  CForm,
  CFormGroup,
  CFormText,
  CValidFeedback,
  CInvalidFeedback,
  CTextarea,
  CInput,
  CInputFile,
  CInputCheckbox,
  CInputRadio,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CDropdown,
  CInputGroupText,
  CLabel,
  CSelect,
  CRow,
  CSwitch
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { addStudent } from '../../../actions/students'
import { useDispatch, useSelector } from 'react-redux'
import students from 'src/reducers/students'
import { studentConstants } from 'src/actions/constants'

const AddNewStudent = () => {

  const [Name, setName]= useState('')
  const [Enrollment_No, setEnrollmentNo]= useState('')
  const [Registration_No, setRegistrationNo]= useState('')
  const [Semester, setSemester]= useState('')
  const [Year, setYear]= useState('')
  const [Course_Name, setCourseName]= useState('')
  const [Course_Code, setCourseCode]= useState('')
  const [studentImages, setStudentImages]= useState([])
  const student = useSelector(state => state.student)

  const dispatch= useDispatch()

  const submitForm= (e) => {
    e.preventDefault()
    console.log()
    // console.log(Name.value.match('/^[-+]?[0-9]+$/'))

    if(Name === ""){
      alert('Name is required')

    }
    else if(!(/^[a-zA-Z ]*$/.test(Name))){
      alert('Please enter a correct Name.')
    }
    else if(Enrollment_No === ""){
      alert('Enrollment No is required')

    }
    else if(!(/^[0-9]+(-[0-9]+)+$/.test(Enrollment_No))){
      alert('Please enter a correct enrollment number')
    }

   
    else if(Registration_No === ""){
      alert('Registration No is required')
    }
    else if(!(/^[0-9]+$/.test(Registration_No))){
      alert('Please enter a correct registration number.')
    }
    else if(Semester === ""){
      alert('Semester is required')
    }
    else if(Year === ""){
      alert('Year is required')
    }
    else if(Course_Name === ""){
      alert('Course Name is required')
    }
    else if(Course_Code === ""){
      alert('Course Code is required')
    }
    
    const form= new FormData();
    form.append('Name', Name)
    form.append('Enrollment_No', Enrollment_No);
    form.append('Registration_No',  Registration_No);
    form.append('Semester', Semester);
    form.append('Year', Year);
    form.append('Course_Name', Course_Name);
    form.append('Course_Code', Course_Code);
   
   
    
    for (let image of studentImages){

 
      
      form.append(`image_${image.name}`, image)
    }
    
    // console.log(images)
    // const student={
    //   Name,
    //   Enrollment_No,
    //   Registration_No,
    //   Semester,
    //   Year,
    //   Course_Name,
    //   Course_Code,
    //   images 
      
      
    // }
    
    
    dispatch(addStudent(form))

    


  }

  const handleStudentImages = (e) => {
    setStudentImages([
      ...studentImages,
      e.target.files[0]

    ])
  }




    return (
        <CCard>
            <CCardHeader>
              Add New Student
              
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" onSubmit={submitForm}>
                <CFormGroup>
                  <CLabel htmlFor="nf-name">Name</CLabel>
                  <CInput type="text" id="nf-name" name="nf-name" placeholder="Name" autoComplete="name" onChange={(e) => setName(e.target.value)}/>
                  
                </CFormGroup>
                <CFormGroup row className="my-0">
                  <CCol xs="6">
                    <CFormGroup>
                    <CLabel htmlFor="nf-enrollmentno">Enrollment No</CLabel>
                  <CInput type="text" id="nf-enrollmentno" name="nf-enrollmentno" placeholder="Enrollment Number" autoComplete="enrollment_no" onChange={(e) => setEnrollmentNo(e.target.value)}/>
                  
                    </CFormGroup>
                    </CCol>
                    <CCol xs="6">
                    <CFormGroup>
                  <CLabel htmlFor="nf-registrationno">Registration No</CLabel>
                  <CInput type="text" id="nf-registrationno" name="nf-registrationno" placeholder="Registration Number" autoComplete="registration_no" onChange={(e) => setRegistrationNo(e.target.value)}/>
                  
                </CFormGroup>

                    </CCol>
                    </CFormGroup>
                   
            
                  

               
                <CFormGroup row className="my-0">
                <CCol xs="6">
                  <CFormGroup>
                  <CLabel htmlFor="select">Select Semester</CLabel>
                  <CSelect custom name="select" id="select" onChange={(e) => setSemester(e.target.value)}>
                      <option value="0">Please select</option>
                      <option value="1">Semester 1</option>
                      <option value="2">Semester 2</option>
                      <option value="3">Semester 3</option>
                      <option value="4">Semester 4</option>
                      <option value="5">Semester 5</option>
                      <option value="6">Semester 6</option>
                      <option value="7">Semester 7</option>
                      <option value="8">Semester 8</option>
                    </CSelect>
                  </CFormGroup>
                </CCol>
                <CCol xs="6">
                <CFormGroup>
                  <CLabel htmlFor="select">Select Year</CLabel>
                  <CSelect custom name="select" id="select" onChange={(e) => setYear(e.target.value)}>
                      <option value="0">Please select</option>
                      <option value="Fall 2020">Fall 2020</option>
                      <option value="Spring 2021">Spring 2021</option>
                      <option value="Fall 2021">Fall 2021</option>
                      <option value="Spring 2022">Spring 2022</option>
                    
                    </CSelect>
                  </CFormGroup>
                  </CCol>
                  </CFormGroup>
                  
                  
                  


              <CFormGroup row className="my-0">
                <CCol xs="6">
                <CFormGroup>
                  <CLabel htmlFor="select">Select Course Name</CLabel>
                  <CSelect custom name="select" id="select" onChange={(e) => setCourseName(e.target.value)}>
                      <option value="0">Please select</option>
                      <option value="DCN">DCN</option>
                      <option value="OOP">OOP</option>
                      <option value="DBMS">DBMS</option>
                      <option value="DSA">DSA</option>
                    
                    </CSelect>
                  </CFormGroup>
                </CCol>
                <CCol xs="6">
                <CFormGroup>
                  <CLabel htmlFor="select">Select Course Code</CLabel>
                  <CSelect custom name="select" id="select" onChange={(e) => setCourseCode(e.target.value)}>
                      <option value="0">Please select</option>
                      <option value="D1-101">D1-101</option>
                      <option value="ST-203">ST-203</option>
                      <option value="AD-567">AD-567</option>
                      <option value="TU-689">TU-689</option>
                    
                    </CSelect>
                  </CFormGroup>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Add Images</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInputFile 
                      id="file-multiple-input" 
                      name="file-multiple-input" 
                      multiple
                      custom
                      onChange={handleStudentImages}
                      
                    />
                    <CLabel htmlFor="file-multiple-input" variant="custom-file">
                    {
                        studentImages.length > 0 ? studentImages.map(img => {
                          return(
                            <span style={{paddingRight: 10}}>{img.name}</span>

                          )
                        }) : 'Add files...'
                    }
                    </CLabel>
                   
                   
                    
                  </CCol>
                </CFormGroup>
                <CCardFooter>
              <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton> <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            
            </CCardFooter>
             
                
           
               
              </CForm>
            </CCardBody>
          
          </CCard>
    )
}

export default AddNewStudent
