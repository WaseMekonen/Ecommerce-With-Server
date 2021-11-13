const contactForm = document.getElementById("contact-Form");

contactForm.addEventListener("submit", addMessagesFromContact);

function addMessagesFromContact(e) {
  e.preventDefault();
  const Fname = document.getElementById("coFname").value,
  Lname = document.getElementById("coLname").value,
  Mail = document.getElementById("coEmail").value,
  Message = document.getElementById("coMessage").value;

  const userMessageObj = {
    Fname,
    Lname,
    Mail,
    Message,
  };
  
  axios
  .post("/contact",userMessageObj)
  .then((response)=>{
    console.log(response);
  })
  .catch((err)=>{
    console.log(err);
  })
}


function showAllMessages (){
  
}