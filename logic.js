// PORTAL LOGIC
document.addEventListener("DOMContentLoaded", function () {
    const adminTab = document.getElementById("adminTab");
    const studentTab = document.getElementById("studentTab");
    const adminForm = document.getElementById("adminForm");
    const studentForm = document.getElementById("studentForm");

    // Check if adminTab and studentTab buttons exist before attaching event listeners
    if (adminTab && studentTab) {
        adminTab.addEventListener("click", function () {
            adminForm.style.display = "block";
            studentForm.style.display = "none";
        });

        studentTab.addEventListener("click", function () {
            adminForm.style.display = "none";
            studentForm.style.display = "block";
        });
    }
});

    // Add logic for admin sign-in, admin sign-up, student sign-in, and student sign-up here.

 // ADMIN LOGIC
 document.addEventListener("DOMContentLoaded", function () {
    const classDetailsBtn = document.getElementById("classDetailsBtn");
    const studentDetailsBtn = document.getElementById("studentDetailsBtn");
    // const attendanceBtn = document.getElementById("attendanceBtn");
    const classDetailsForm = document.getElementById("classDetailsForm");
    const studentDetailsForm = document.getElementById("studentDetailsForm");
    // const markAttendanceForm = document.getElementById("markAttendanceForm");
    

    // Check if classDetailsForm and studentDetailsForm elements exist before calling toggleForms
    if (classDetailsForm && studentDetailsForm) {
        // Function to toggle visibility of class and student forms
        function toggleForms(isClassFormVisible) {
            classDetailsForm.style.display = isClassFormVisible ? "block" : "none" ;
            studentDetailsForm.style.display = isClassFormVisible ? "none" : "block";
            // markAttendanceForm.style.display = isClassFormVisible ? "none" : "block";

        }

        // Initially, show the class details form and hide the student details form
        toggleForms(true);

        // Add event listeners if the buttons exist
        if (classDetailsBtn) {
            classDetailsBtn.addEventListener("click", function () {
                toggleForms(true); // Show class details form
            });
        }

        if (studentDetailsBtn) {
            studentDetailsBtn.addEventListener("click", function () {
                toggleForms(false); // Show student details form
            });
        }
        // if (attendanceBtn) {
        //     attendanceBtn.addEventListener("click", function () {
        //         toggleForms(false); // Show attendance form
        //     });
        // }
    }

    // Add logic for CRUD operations (Add, Update, Delete) for classes and students here.
});

    
    
    
    

import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
import { getDatabase, get,set, ref,child, update,remove } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
const auth = getAuth();
const db = getDatabase();


// ADMIN SIGNUP 
const adminSignupBtn = document.getElementById("adminSignUp")

const signupAdmin = () => {
    console.log(auth);
    let userName = document.getElementById("adminUsername");
    let email = document.getElementById("adminEmail");
    let password = document.getElementById("adminPassword");
    
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in 
      alert("Admin Created")
     
      // ...
    })
    .catch((error) => {
      alert("signup rejected")
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}

adminSignupBtn && adminSignupBtn.addEventListener("click", signupAdmin);

// STUDENT SIGNUP 
const studentSignupBtn = document.getElementById("studentSignUp")


const signupStudent = () => {
    console.log(auth);
    let userName = document.getElementById("studentName");
    let rollNo = document.getElementById("studentRollNumber");
    let email = document.getElementById("studentEmail");
    let password = document.getElementById("studentPassword");
    
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in 
      alert("Student Created")
     
      // ...
    })
    .catch((error) => {
      alert("signup rejected")
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}

studentSignupBtn && studentSignupBtn.addEventListener("click", signupStudent);

// ADMIN LOGIN
const adminLoginBtn = document.getElementById("adminLogin")
const adminLogin = () => {
    let emaill = document.getElementById("adminEmail");
    let passwordd = document.getElementById("adminPassword")
    signInWithEmailAndPassword(auth, emaill.value, passwordd.value)
    .then((userCredential) => {
      // Signed in 
      alert("Admin Logged in")
      const user = userCredential.user;
      window.location.href = "http://127.0.0.1:5500/admin.html";

      
      // ...
    })
    .catch((error) => {
        alert("Login rejected")
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  
}
adminLoginBtn && adminLoginBtn.addEventListener("click", adminLogin);

// STUDENT LOGIN

const studentLoginBtn = document.getElementById("studentLogin")
const studentLogin = () => {
    let emaill = document.getElementById("studentEmail");
    let passwordd = document.getElementById("studentPassword")
    signInWithEmailAndPassword(auth, emaill.value, passwordd.value)
    .then((userCredential) => {
      // Signed in 
      alert("Student Logged in")
      const user = userCredential.user;
      window.location.href= "http://127.0.0.1:5500/student.html"
      
      // ...
    })
    .catch((error) => {
        alert("Login rejected")
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  
}
studentLoginBtn && studentLoginBtn.addEventListener("click", studentLogin);

// ADMIN DATABASE CONNECTIVITY
//CLASS DETAILS
let classTimings = document.getElementById("classTimings");
let schedule = document.getElementById("schedule");
let teacherName = document.getElementById("teacherName");
let sectionName = document.getElementById("sectionName");
let courseName = document.getElementById("courseName");
let batchNumber = document.getElementById("batchNumber");



// INSERT CLASS DATA FUNCTION
const insertClassDetails = document.getElementById("addClass")

function insertClassData(){
    set(ref(db, "ClassDetails/"+teacherName.value),{
        ClassTimings: classTimings.value,
        Schedule: schedule.value,
        SectionName: sectionName.value,
        CourseName: courseName.value,
        BatchNumber: batchNumber.value
    })
    .then(()=>{
        alert("Class Details Added Successfully");
    })
    .catch((error)=>{
        alert("Data Not Added"+error)
    });
}
insertClassDetails && insertClassDetails.addEventListener("click", insertClassData);

// SELECT CLASS DATA FUNCTION
const selectClassDetails = document.getElementById("selectClass")
function selectClassData(){
    const dbref = ref(db);
    get(child(dbref,"ClassDetails/"+teacherName.value)).then((snapshot)=>{
        if(snapshot.exists()){
            classTimings.value  =  snapshot.val().ClassTimings
            schedule.value = snapshot.val().Schedule
            sectionName.value = snapshot.val().SectionName
            courseName.value = snapshot.val().CourseName
            batchNumber.value  = snapshot.val().BatchNumber
        }
        else{
            alert("Data Not Found")
        }
    })
    .catch((error)=>{
        alert("Data Not Selected"+error)
    })
}
selectClassDetails && selectClassDetails.addEventListener("click", selectClassData);

// UPDATE CLASS DATA FUNCTION
const updateClassDetails = document.getElementById("updateClass")

function updateClassData(){
    update(ref(db, "ClassDetails/"+teacherName.value),{
        ClassTimings: classTimings.value,
        Schedule: schedule.value,
        SectionName: sectionName.value,
        CourseName: courseName.value,
        BatchNumber: batchNumber.value
    })
    .then(()=>{
        alert("Class Details Updated Successfully");
    })
    .catch((error)=>{
        alert("Data Not Updated"+error)
    });
}
updateClassDetails && updateClassDetails.addEventListener("click", updateClassData);

// DELETE CLASS DATA FUNCTION
const deleteClassDetails = document.getElementById("deleteClass")

function deleteClassData(){
    remove(ref(db, "ClassDetails/"+teacherName.value),{
       
    })
    .then(()=>{
        alert("Class Details Deleted Successfully");
    })
    .catch((error)=>{
        alert("Data Not Deleted"+error)
    });
}
deleteClassDetails && deleteClassDetails.addEventListener("click", deleteClassData);

//STUDENT DETAILS
let studentName = document.getElementById("studentName");
let fatherName = document.getElementById("fatherName");
let rollNumber = document.getElementById("rollNumber");
let contactNumber = document.getElementById("contactNumber");
let cnicNumber = document.getElementById("cnicNumber");
let studentCourse = document.getElementById("studentCourse");
let classTeacher = document.getElementById("classTeacher");

//ADD STUDENT DATA
const insertStudentDetails = document.getElementById("addStudent")
function insertStudentData(){
    set(ref(db, "StudentDetails/"+rollNumber.value),{
        studentName: studentName.value,
        fatherName: fatherName.value,
        rollNumber: rollNumber.value,
        contactNumber: contactNumber.value,
        cnicNumber: cnicNumber.value,
        studentCourse : studentCourse.value,
        classTeacher : classTeacher.value
               
    })
    .then(()=>{
        alert("Student Details Added Successfully");
    })
    .catch((error)=>{
        alert("Student Data Not Added"+error)
    });
}
insertStudentDetails && insertStudentDetails.addEventListener("click",insertStudentData);

//READ STUDENT DATA
const selectStudentDetails = document.getElementById("selectStudent")
function selectStudentData(){
    const dbref = ref(db);
    get(child(dbref,"StudentDetails/"+rollNumber.value)).then((snapshot)=>{
        if(snapshot.exists()){
            studentName.value  =  snapshot.val().studentName
            fatherName.value = snapshot.val().fatherName
            contactNumber.value = snapshot.val().contactNumber
            cnicNumber.value  = snapshot.val().cnicNumber
            studentCourse.value  = snapshot.val().studentCourse
            classTeacher.value  = snapshot.val().classTeacher           
        }
        else{
            alert("Data Not Found")
        }
    })
    .catch((error)=>{
        alert("Data Not Selected"+error)
    })
}
selectStudentDetails && selectStudentDetails.addEventListener("click", selectStudentData);

// UPDATE STUDENT DATA 
const updateStudentDetails = document.getElementById("updateStudent")

function updateStudentData(){
    update(ref(db, "StudentDetails/"+rollNumber.value),{
        studentName: studentName.value,
        fatherName: fatherName.value,     
        contactNumber: contactNumber.value,
        cnicNumber: cnicNumber.value,
        studentCourse : studentCourse.value,
        classTeacher : classTeacher.value
               
    })
    .then(()=>{
        alert("Student Details Updated Successfully");
    })
    .catch((error)=>{
        alert("Data Not Updated"+error)
    });
}
updateStudentDetails && updateStudentDetails.addEventListener("click", updateStudentData);

// DELETE STUDENT DATA FUNCTION
const deleteStudentDetails = document.getElementById("deleteStudent")

function deleteStudentData(){
    remove(ref(db, "StudentDetails/"+rollNumber.value),{
       
    })
    .then(()=>{
        alert("Student Details Deleted Successfully");
    })
    .catch((error)=>{
        alert("Data Not Deleted"+error)
    });
}
deleteStudentDetails && deleteStudentDetails.addEventListener("click", deleteStudentData);

//MARK ATTENDANCE
const currentTime = new Date();
let rollNo = document.getElementById("rollNumberInput");
let statusSelect = document.getElementById("statusSelect");
const markAttendanceBtn = document.getElementById("markAttendanceBtn")
function markAttendance(){
    set(ref(db, "StudentAttendance/"+rollNo.value),{
       AttendanceStatus: statusSelect.value,      
    })
    .then(()=>{
        alert("Student Attendance Marked");
    })
    .catch((error)=>{
        alert("Student Attendance Not Marked"+error)
    });
}
markAttendanceBtn && markAttendanceBtn.addEventListener("click", markAttendance);


