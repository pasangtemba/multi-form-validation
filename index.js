const yearElement = document.getElementById('year');
const monthElement = document.getElementById('month');
const dayElement = document.getElementById('day');
let isValid = true;
const notRequiredFields = ['middle_name', 'facebook', 'twitter', 'instagram'];
const socialLinkFields = ['facebook', 'twitter', 'instagram'];
const userDetailsFields = [
  'full_name',
  'email',
  'password',
  'confirm_password',
  'date_of_birth',
  'gender'
]

const populateYear = () => {
  const currentYear = new Date().getFullYear();
  const earlyYear = 1700;
  const years = [];
  for (let i = currentYear; i >= earlyYear; i--) {
    years.push(i);
  }
  years.forEach(year => {
    const option = document.createElement('option');
    option.textContent = year;
    yearElement.appendChild(option);
  });
}

const populateMonth = () => {
  const months = [
    { name: 'January', value: 0 },
    { name: 'February', value: 1 },
    { name: 'March', value: 2 },
    { name: 'April', value: 3 },
    { name: 'May', value: 4 },
    { name: 'June', value: 5 },
    { name: 'July', value: 6 },
    { name: 'August', value: 7 },
    { name: 'September', value: 8 },
    { name: 'October', value: 9 },
    { name: 'November', value: 10 },
    { name: 'December', value: 11 },
  ];
  months.forEach(month => {
    const option = document.createElement('option');
    option.textContent = month.name;
    option.value = month.value;
    monthElement.appendChild(option);
  });
}

const populateDays = (year, month) => {
  const days = [];
  const lastDay = new Date(year, month + 1, 0).getDate();
  for (let i = 1; i <= lastDay; i++) {
    days.push(i);
  }

  days.forEach(day => {
    const option = document.createElement('option');
    option.textContent = day;
    dayElement.appendChild(option);
  });
}

const populateDate = () => {
  populateYear();
  populateMonth();
  populateDays(new Date().getFullYear(), new Date().getMonth());

  yearElement.addEventListener('change', e => {
    dayElement.innerHTML = '';
    populateDays(yearElement.value, monthElement.value);
  });
  
  monthElement.addEventListener('change', e => {
    dayElement.innerHTML = '';
    populateDays(parseInt(yearElement.value), parseInt(monthElement.value));
  });
}

const validateUrls = (form3) => {
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  form3.querySelectorAll('input').forEach(input => {
    if(input.value){
      if(!urlRegex.test(input.value)){
        isValid = false;
        if(!input.parentElement.querySelector('.error-message')){
          const errorDiv = document.createElement('div');
          errorDiv.classList.add('error-message');
          errorDiv.textContent = 'Please enter a valid url';
          input.parentElement.appendChild(errorDiv);
        }else{
          input.parentElement.querySelector('.error-message').textContent = 'Please enter a valid url';
        }
      } else {
        isValid = true;
        if(input.parentElement.querySelector('.error-message')){
          const errorDiv = input.parentElement.querySelector('.error-message');
          input.classList.remove('error');
          errorDiv.textContent = '';
        }else{
          input.classList.remove('error');
        }
      }
    }
  });
  return isValid;
}

const validateEmail = (input) => {
  const emailRegex = /\S+@\S+\.\S+/;
  if(!emailRegex.test(input.value)){
    isValid = false;
    if(!input.parentElement.querySelector('.error-message')){
      const errorDiv = document.createElement('div');
      errorDiv.classList.add('error-message');
      errorDiv.textContent = 'Please enter a valid email address';
      input.parentElement.appendChild(errorDiv);
    }else{
      input.parentElement.querySelector('.error-message').textContent = 'Please enter a valid email address';
    }
  } else {
    isValid = true;
    if(input.parentElement.querySelector('.error-message')){
      const errorDiv = input.parentElement.querySelector('.error-message');
      input.classList.remove('error');
      errorDiv.textContent = '';
    }else{
      input.classList.remove('error');
    }
  }
  return isValid;
}

const validatePassword = (input) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  if(!passwordRegex.test(input.value)){
    isValid = false;
    if(!input.parentElement.querySelector('.error-message')){
      const errorDiv = document.createElement('div');
      errorDiv.classList.add('error-message');
      errorDiv.textContent = 'Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 special character and 1 number';
      input.parentElement.appendChild(errorDiv);
    }else{
      input.parentElement.querySelector('.error-message').textContent = 'Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 special character and 1 number';
    }
  } else {
    isValid = true;
    if(input.parentElement.querySelector('.error-message')){
      const errorDiv = input.parentElement.querySelector('.error-message');
      input.classList.remove('error');
      errorDiv.textContent = '';
    }else{
      input.classList.remove('error');
    }
  }
  return isValid;
}

const validateConfirmPassword = (input, password) => {
  if(input.value !== password){
    isValid = false;
    if(!input.parentElement.querySelector('.error-message')){
      const errorDiv = document.createElement('div');
      errorDiv.classList.add('error-message');
      errorDiv.textContent = 'Password does not match';
      input.parentElement.appendChild(errorDiv);
    }else{
      input.parentElement.querySelector('.error-message').textContent = 'Password does not match';
    }
  } else {
    isValid = true;
    if(input.parentElement.querySelector('.error-message')){
      const errorDiv = input.parentElement.querySelector('.error-message');
      input.classList.remove('error');
      errorDiv.textContent = '';
    }else{
      input.classList.remove('error');
    }
  }
  return isValid;
}

const validateRadioButtons = (genderRadios) => {
  let isChecked = false;
    genderRadios.forEach(radio => {
      if(radio.checked){
        isChecked = true;
      }
    });
    if(!isChecked){
      isValid = false;
      const genderContainer = document.querySelector('.gender_container')
      genderRadios.forEach(radio => {
        radio.closest('label').style.border = '2px solid red'; 
      });
      if(!genderContainer.querySelector('.error-message')){
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('error-message');
        errorDiv.textContent = 'Please select an option';
        genderContainer.appendChild(errorDiv);
      }else{
        const errorDiv = genderContainer.querySelector('.error-message');
        errorDiv.textContent = 'Please select an option';
      }
    }else{
      isValid = true;
      const genderContainer = document.querySelector('.gender_container')
      genderRadios.forEach(radio => {
        radio.closest('label').style.border = 'none';
      });

      if(genderContainer.querySelector('.error-message')){
        const errorDiv = genderContainer.querySelector('.error-message');
        errorDiv.textContent = '';
      }
    }
    return isValid;
}

const validateForm = (step) => {
  const form = document.querySelector(`.form${step-1}`);
  const inputs = form.querySelectorAll('input');
  const selects = form.querySelectorAll('select');
  const textareas = form.querySelectorAll('textarea');
  const genderRadios = form.querySelectorAll('input[type=radio]');
  if(genderRadios.length > 0){
   validateRadioButtons(genderRadios);
  }
  const allInputs = [...inputs, ...selects, ...textareas];
  allInputs.forEach(input => {
    if(!notRequiredFields.includes(input.name)){
      if (!input.value) {
        isValid = false;
        input.classList.add('error');
        if(!input.parentElement.querySelector('.error-message')){
          const errorDiv = document.createElement('div');
          errorDiv.classList.add('error-message');
          errorDiv.textContent = 'This field is required';
          input.parentElement.appendChild(errorDiv);
        }
      } else {
       if(step-1 === 1){
        let isEmailValid = true;
        let isPasswordValid = true;
        let isConfirmPasswordValid = true;
        if(input.name === 'email'){
          isEmailValid = validateEmail(input);
         }
   
         if(input.name === 'password'){
          isPasswordValid = validatePassword(input);
         }
   
         if(input.name === 'confirm_password'){
          isConfirmPasswordValid = validateConfirmPassword(input, form.password.value);
         }
         if(isEmailValid && isPasswordValid && isConfirmPasswordValid){
          isValid = true;
          if(input.parentElement.querySelector('.error-message')){
            const errorDiv = input.parentElement.querySelector('.error-message');
            input.classList.remove('error');
            errorDiv.textContent = '';
          }else{
            input.classList.remove('error');
          }
         }else{
          isValid = false;
         }
       }
        if(step-1 === 2){
          if(validateRadioButtons(genderRadios)){
            isValid = true;
            if(input.parentElement.querySelector('.error-message')){
              const errorDiv = input.parentElement.querySelector('.error-message');
              input.classList.remove('error');
              errorDiv.textContent = '';
            }else{
              input.classList.remove('error');
            }
        }else{
          isValid = false;
        }
        }
        
        if(step-1 === 3){
          if(input.parentElement.querySelector('.error-message')){
            const errorDiv = input.parentElement.querySelector('.error-message');
            input.classList.remove('error');
            errorDiv.textContent = '';
          }else{
            input.classList.remove('error');
          }
        }
      }
    }
  });
  return isValid;
}

const handleNext = (step) => {
  validateForm(step);
  if (isValid) {
    const previousContainer = document.getElementById(`container${step-1}`)
    const nextContainer = document.getElementById(`container${step}`);
    previousContainer.classList.add('hidden');
    nextContainer.classList.remove('hidden');
  }
}

const handlePrevious = (step) => {
  const previousContainer = document.getElementById(`container${step+1}`)
  const nextContainer = document.getElementById(`container${step}`);
  previousContainer.classList.add('hidden');
  nextContainer.classList.remove('hidden');
}

const populateDetails = (array) => {
  
}

const handleSubmit = () => {
  const form1 = document.querySelector('.form1');
  const form2 = document.querySelector('.form2');
  const form3 = document.querySelector('.form3');

 if(!validateUrls(form3)){
  return
 }

  const email = form1.email.value;
  const password = form1.password.value;
  const confirmPassword = form1.confirm_password?.value;

  const firstName = form2.first_name.value;
  const middleName = form2.middle_name.value;
  const lastName = form2.last_name.value;
  const dob = `${form2.year.value}-${form2.month.value}-${form2.day.value}`
  const gender = form2.gender.value;

  const facebook = form3.facebook.value;
  const twitter = form3.twitter.value;
  const instagram = form3.instagram.value;

  const container4 = document.getElementById('container4');
  container4.classList.remove('hidden');
  document.getElementById('container3').classList.add('hidden');

  document.getElementById('full_name_value').textContent = `${firstName} ${middleName} ${lastName}`;
  document.getElementById('email_value').textContent = email;
  document.getElementById('password_value').textContent = password;
  document.getElementById('confirm_password_value').textContent = confirmPassword;
  document.getElementById('dob_value').textContent = dob;
  document.getElementById('gender_value').textContent = gender;

  const socialMediaContainer = document.getElementById('social_media_container');
  socialLinkFields.forEach(field => {
    if(!socialMediaContainer.querySelector(`.${field}`)){
      const div = document.createElement('div');
      div.classList.add('social_media');
      div.classList.add(field);
      const label = document.createElement('label');
      label.textContent = `${field.charAt(0).toUpperCase()}${field.slice(1)}: `;
      const value = document.createElement('span');
      value.textContent = eval(field);
      div.appendChild(label);
      div.appendChild(value);
      socialMediaContainer.appendChild(div);
    }else{
      const value = socialMediaContainer.querySelector(`.${field} span`);
      value.textContent = eval(field);
    }
  });
  document.getElementById('facebook_value').textContent = facebook;
  document.getElementById('twitter_value').textContent = twitter;
  document.getElementById('instagram_value').textContent = instagram;

}


populateDate();





