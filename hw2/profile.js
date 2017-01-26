
window.onload = function() {

    const error_msg = {
        "name": "name can only be upper or lower case letters and \
                numbers, but may not start with a number",
        "email": "email should be in the format of a@b.com",
        "phone": "phone should be a ten digit number 1234567890",
        "zipcode": "zip code should be a five digit pure number",
        "pwd1": "passwords do not match"
    }
  
    function validate_pwd() {
        const pwd0 = document.getElementById('pwd0')
        const pwd1 = document.getElementById('pwd1')
        return pwd0.value === pwd1.value ? "" : "<li>" 
                            + error_msg["pwd1"] + "</li>"
        
    }

    document.getElementById('update_btn')
            .addEventListener("click", function(){
        //to get a list of input fields that are not empty
        const changed = Array.prototype
                             .filter
                             .call(document.getElementsByTagName('input'), 
                            (field) => field.value !== "")
    
        const invalidFields = changed.filter(function(field) { 
                return !field.validity.valid
        })
        const invalidMsgs = invalidFields.reduce(function(msg, f) {
                                return msg + "<li>" + error_msg[f.id] + "</li>"
        }, "") + validate_pwd()                             

        const notificationField = document.getElementById("error_msg")

        //only allow update of value when there are no errors 
        //by checking invalidMsgs is empty
        if (invalidMsgs === "") {
            const updateFields = changed.filter(function(field){ 
                return field.value !== field.nextElementSibling.innerHTML
            })
            //to create a unordered list of update fields messages
            const updateMsgs = updateFields.reduce(function(msg, f) {
                return msg + "<li>" + f.previousElementSibling.innerHTML + 
                ": " + f.nextElementSibling.innerHTML + 
                " -> " + f.value +"</li>"
            }, "")
            notificationField.innerHTML = updateMsgs === "" ?  "" : 
                                    "<p id='update_label'>Updated fields:\
                                        </p> <ul>" + updateMsgs + "</ul>"

            changed.forEach(function(field){
                field.nextElementSibling.innerHTML = field.value
                field.value = ""
            })
        }else {
            notificationField.innerHTML = "<p id='error_label'>Input errors: \
                                            </p> <ul>" + invalidMsgs + "</ul>"
        }

    })

}