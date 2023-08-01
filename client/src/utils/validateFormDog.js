const validateFormDog = (activityData) => {
  const errors = {};

  if(activityData.name.length < 3){
    errors.name = 'Minimum 3 characters.'
  };
  if(activityData.name.length > 35){
    errors.name = 'Maximum 35 characters.'
  };

  if(!activityData.height){
    errors.height = 'Enter an height.'
  };
  if(activityData.height < 10){
    errors.height = 'Minimum 10cm.'
  };
  if(activityData.height > 170){
    errors.height = 'Maximum 170cm.'
  };

  if(!activityData.weight){
    errors.weight = 'Enter an weight.'
  };
  if(activityData.weight < 5){
    errors.weight = 'Minimum 5cm.'
  };
  if(activityData.weight > 250){
    errors.weight = 'Maximum 250cm.'
  };

  if(!activityData.life_span){
    errors.life_span = 'Enter an lifeSpan.'
  };
  if(activityData.life_span < 1){
    errors.life_span = 'Minimum 1y.'
  };
  if(activityData.life_span > 25){
    errors.life_span = 'Maximum 25y.'
  };

  if(activityData.temperament.length === 0){
    errors.temperament = 'Please select at least one temperament.'
  };

  return errors;
};

export default validateFormDog;