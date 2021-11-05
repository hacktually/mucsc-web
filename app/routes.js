var conn	   = require('./db-ops').connection

module.exports = function(app){
	
	app.get('/', function(req,res){
		res.render('index', {});
	});
	app.get('/dbtest', function(req,res){
		if(conn.state != 'disconnected') {
			console.log('All connected!')
		} else {
			console.log('dead as hell')
		}
	});
	
	// app.get('/add_data', function(req,res){
	// 	conn.query("SELECT num_inputs FROM project_meta;", function(err, inputs){
	// 		res.render('add_data.html', {inputs: inputs[0].num_inputs});
	// 	});
	// });

	// app.post('/insert_data', function(req,res){
	// 	console.log("Connection made.");
	// 	//conn.query("INSERT INTO project_meta (project_name, num_inputs, meta_data) VALUES (?,?,?);", [req.body.col0, req.body.col1, req.body.col2]);
	// });
		

	// app.get('/map_vis', function(req,res){
	// 	res.render('map_vis.html');
	// });


};