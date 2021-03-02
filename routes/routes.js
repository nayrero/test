const express = require('express');
const bodyParser = require('body-parser');
//const Sequelize = require('sequelize')
const router = express.Router();
router.use(express.json());
router.use(bodyParser.urlencoded({
    extended: true
}));
router.get('/about', function (request, response) {
  response.render('about.hbs');
	});
//---------------------------------------
router.get('/', function (request, response) {
  response.render('home.hbs');
	});

//получение данных с формы и сортировка
router.post('/inputdata', (request, response) => {
  //response.send("asfasfasf")
  if (!request.body) return response.sendStatus(400);
  //console.log(request.body);
  
//--------------sorting-------------
sorting = function() {
		var val = request.body.inputmassive;
		var arr = val.split('');
		var check = 0, buffer, min;
		for(let j = 0; j < arr.length - 1; j++) {
			check = 0;
			min = j;
			for(i = j; i < arr.length - 1 - j; i++){
				if(arr[i] > arr[i+1]) {
				buffer = arr[i];
				arr[i] = arr[i+1];
				arr[i+1] = buffer;
				check = 1;
				}
				if(arr[i] < arr[min]) {
				min = i;
				}			
			}
			if(check == 0){break;}
			if(min != j){
				buffer = arr[j];
				arr[j] = arr[min];
				arr[min] = buffer;
			}
		}
		var sort = arr.join('');
		return sort;
			};
//--------------sorting-------------

  response.render('home.hbs', {
    sort_data: sorting
  }); 
});

const { Sort } = require('../connection')

//-------сохранение массива в БД--------------------
router.post('/savedata', (request, response) => {
 if (!request.body) return response.sendStatus(400);
 console.log(request.body.output_sort);

 //--------------добавление записи-----------
 Sort.create({
    sort_data: request.body.output_sort
           
   	}).then(sort=>{
  	   console.log(sort.sort_id);
  	   //buffer = sort.sort_id;
  	   response.render('home.hbs', {
 	message: 'Массив ' + request.body.output_sort + 
 	' с идентификатором '+ sort.sort_id +' сохранен в базу'
 });
  }).catch(err=>console.log(err));

});

//------------запрос по id-----------
router.post('/requestdata', (request, response) => {
 if (!request.body) return response.sendStatus(400);
 console.log(request.body.output_sort);


Sort.findOne({where: {sort_id: request.body.requestid}})
.then(sort=>{

    if(sort == null) {
    	response.render('home.hbs', {
 	message2: 'Массив  с идентификатором '+ request.body.requestid +' не найден'
 });
    }else{
    
    response.render('home.hbs', {
 	message2: 'Массив ' + sort.sort_data + 
 	' с идентификатором '+ sort.sort_id
 });}

}).catch(err=>console.log(err));

//console.log(sortRequest);

});

module.exports = router;