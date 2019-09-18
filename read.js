const  
	fs=require ("fs"),
	xlsx=require ("xlsx");
	
  workSheetsFromFile = xlsx.readFile(`myFile.xlsx`);
	 let data=xlsx.utils.json_to_sheet([workSheetsFromFile.Sheets.Sheet1]);
	  console.log(data) 
	
