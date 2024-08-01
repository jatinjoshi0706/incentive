module.exports = (qualifiedRM, formData, salesExcelDataSheet) => {
  qualifiedRM.forEach((element) => {
    //Setting default incentive to 0
    element["GNA Incentive"] = 0;
    let userID = element["DSE ID"];
    // let userDate = element["Delivery Date"];
    if (formData.GNAIncentive.length !== 0) {
      salesExcelDataSheet.forEach((data) => {
        if (data.hasOwnProperty(userID)) {
          data[userID].forEach((record) => {
            let userGNA = parseInt(record["gna"]);
            for (const range of formData["GNAIncentive"]) {
              if (range.max === null) {
                if (userGNA >= range.min) {
                  element["GNA Incentive"] =
                    element["GNA Incentive"] +
                    (range.incentive * userGNA) / 100;
                  break;
                }
              } else {
                if (userGNA >= range.min && userGNA <= range.max) {
                  element["GNA Incentive"] =
                    element["GNA Incentive"] +
                    (range.incentive * userGNA) / 100;
                  break;
                }
              }
            }
          });
        }
      });
    }
  });

  return qualifiedRM;
};
