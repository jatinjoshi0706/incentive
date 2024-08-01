
module.exports =  (qualifiedRM, formData) => {

     
    qualifiedRM.forEach(element => {


        
if(formData.complaintType == 'fixvalueDeduction'){

        element["Complaint Deduction"] = 0;


        if(formData.ComplaintInputs.length !== 0){
        let userComplaintNumber = element["Complaints"];


//Loop to check if Exchange Status of DSE falls in the range of MGA inputs given by user and calculate its incentive 

        for (let i = 0; i < formData.ComplaintInputs.length; i++) {
            if (userComplaintNumber === parseInt(formData.ComplaintInputs[i].ComplaintNumber)) {
                element["Complaint Deduction"] = formData.ComplaintInputs[i].incentive;
            }
        }

 //if DSE Complaints Status value is greater than the largest input number of Complaints then we calculate deduction on the basis of the highest value

        const lastIncentive = formData.ComplaintInputs[formData.ComplaintInputs.length - 1].incentive;
        if (userComplaintNumber > parseInt(formData.ComplaintInputs[formData.ComplaintInputs.length - 1].ComplaintNumber)) {
            element["Complaint Deduction"] = lastIncentive;
        }


    }
}   
else{

    element["Complaint Deduction"] = 0;

    let TotalforCalc =  element["Total PerCar Incentive"] + element['SpecialCar Incentive'] + element["TotalModelIncentive"]

    if(formData.ComplaintInputs.length !== 0){
    let userComplaintNumber = element["Complaints"];

    for (let i = 0; i < formData.ComplaintInputs.length; i++) {
        if (userComplaintNumber === parseInt(formData.ComplaintInputs[i].ComplaintNumber)) {
            element["Complaint Deduction"] = formData.ComplaintInputs[i].incentive*TotalforCalc/100;
        }
    }

    const lastIncentive = formData.ComplaintInputs[formData.ComplaintInputs.length - 1].incentive;
    if (userComplaintNumber > parseInt(formData.ComplaintInputs[formData.ComplaintInputs.length - 1].ComplaintNumber)) {
        element["Complaint Deduction"] = lastIncentive*TotalforCalc/100;
       
    }





    }

}
    
    });
    
    return qualifiedRM;
    }