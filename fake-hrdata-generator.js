/* generate some fake HR data */

var Chance = require('chance');
var chance = new Chance();

chance.mixin({
'p_job_description': function(employee_country) {

    var _rank_cointoss = chance.bool({ likelihood: 20 });
    var compute_salary = function() {
      var _min = (_rank_cointoss)? 5000: 150000;
      var _max = (_rank_cointoss)? 100000: 200000;
        return (employee_country == "us")? chance.dollar({min: _min, max: _max}): chance.euro({min: _min, max: _max})
    }
    return {
        job_id: chance.integer ({min: 10, max: 30}),
        title: chance.profession({rank: _rank_cointoss}),
        salary: compute_salary(),
        stock_options: (_rank_cointoss) ? chance.integer({ min: 5000, max: 50000 }): chance.integer({ min: 50000, max: 100000 })
    };
}
});

chance.mixin({
'p_dependent': function(lastname) {
  var _gender_cointoss = (chance.bool({ likelihood: 50 })) ? 'male': 'female';
  return {
    first_name: chance.first({gender: _gender_cointoss}),
    last_name: lastname,
    relationship: (_gender_cointoss == "male")? "Husband": "Wife"
  };
}
});

chance.mixin({
'p_home_address': function(country) {

  var _postcode = function() {
    if (country == "us") {
      return chance.zip()
    } else if (country == "uk") {
      return chance.postcode  ()
    } else if (country == "fr"){
      return chance.pickone(['14600','14710','14310'])
    }
  }

  return {
    street_name: chance.address({short_suffix: chance.bool({ likelihood: 50 })}),
    city: chance.city(),
    country: country,
    postal_code: _postcode(country)
  };
}
});

function employee_record(employee_id, company_domain, employee_country)
{
  this.employee_id = employee_id;
  this.first_name = chance.first({ gender: "female" });
  this.last_name =  chance.last();
  this.email = this.first_name + "." + this.last_name + "@" + company_domain;
  this.home_phone = chance.phone({ country: employee_country });
  this.country = employee_country;
  this.hire_date = chance.date({string: true, year: chance.pickone(['2000','2001','2002','2003','2004','2005'])});
  this.job_description = chance.p_job_description(employee_country);
  this.dependent = chance.p_dependent(this.last_name);
  this.home_address = chance.p_home_address(employee_country);
}

function print_hr_data() {
  while(true) {

    var _employeeID = "E" + chance.pad(chance.natural({min: 1, max: 100000}), 6);
    var _companyDomain = chance.company().replace(/\s/g,'').replace(/\./g,'') + ".com";
    var _employeeCountry = chance.pickone(['us', 'uk','fr']);

    var instance = new employee_record(_employeeID, _companyDomain, _employeeCountry);
    console.log(JSON.stringify(instance));

  }
}

/* use this stuff if you want to do performance testing */
var cluster = require('cluster');
  var numCPUs = process.argv[2];

  if(!numCPUs) {console.log("How many processes shall we run? "); process.exit(0); }

  if (cluster.isMaster) {
    // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
  cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
 });
} else {
  print_hr_data();
}
