import { correct, wrong } from '../../assets';

// tslint:disable-next-line: typedef
function addMailEvent() {
  const emailElem = document.querySelector('#email-id');
  const passwordElem = document.querySelector('#password-id');
  const errorElem = document.querySelector('.error-message-1') as HTMLSpanElement;
  const validateElem = document.querySelector('.input-validate');
  if (emailElem && passwordElem) {
    emailElem.addEventListener('blur', (event) => {
      const target = event.target as HTMLInputElement;
      if (target.value !== '') {
        console.log(validateEmail(target.value), target.value);
        if (!validateEmail(target.value)) {
          target.style.border = '1.5px solid #FF0212';
          target.style.boxShadow = '0px 2px 4px rgba(255, 0, 0, 0.14)';
          if (errorElem) {
            errorElem.innerHTML = '<span class="ll" style="font-size: 10px;color: #FF0212;font-weight: 500;">Please Enter a valid Email-id</span>';
          }
          if (validateElem) {
            const img = document.createElement('img');
            img.src = wrong;
            validateElem.innerHTML = '';
            validateElem.appendChild(img);
          }
        } else {
          target.style.border = '1.5px solid #CFCFCF';
          target.style.boxShadow = '0px 2px 4px rgba(166, 166, 166, 0.14)';

          if (errorElem) {
            errorElem.innerHTML = '';
          }
          if (validateElem) {
            const img = document.createElement('img');
            img.src = correct;
            validateElem.innerHTML = '';
            validateElem.appendChild(img);
          }
        }
      } else {
        console.log('nothing');
      }
    });
  }
}

// tslint:disable-next-line: typedef
function validateEmail(email: string) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

// tslint:disable-next-line: typedef
function validateCredentials(
  email: boolean,
  password: boolean,
  confirm: boolean
) {
  const emailElem = document.querySelector('#email-id') as HTMLInputElement;
  const passwordElem = document.querySelector('#password-id') as HTMLInputElement;
  const confirmElem = document.querySelector('#confirm-id') as HTMLInputElement;
  // tslint:disable-next-line: variable-name
  const errorElem_1 = document.querySelector('.error-message-1');
  // tslint:disable-next-line: variable-name
  const errorElem_2 = document.querySelector('.error-message-2');
  // tslint:disable-next-line: variable-name
  const errorElem_3 = document.querySelector('.error-message-3');
  // tslint:disable-next-line: variable-name
  const validateElem_1 = document.querySelector('.input-validate');
  // tslint:disable-next-line: variable-name
  const validateElem_2 = document.querySelector('.password-validate');
  // tslint:disable-next-line: variable-name
  const validateElem_3 = document.querySelector('.confirm-validate');
  let validationFlag = false;
  if (emailElem) {
    if (email) {
      console.log(validateEmail(emailElem.value), emailElem.value);
      if (!validateEmail(emailElem.value)) {
        emailElem.style.border = '1.5px solid #FF0212';
        emailElem.style.boxShadow = '0px 2px 4px rgba(255, 0, 0, 0.14)';
        if (errorElem_1) {
          // errorElem_1.innerHTML = '<span style="font-size: 10px;color: #FF0212;font-weight: 500;">Please Enter a valid Email-id</span>';
        }
        if (validateElem_1) {
          const img = document.createElement('img');
          img.src = wrong;
          validateElem_1.innerHTML = '';
          validateElem_1.appendChild(img);
        }
      } else {
        if (errorElem_1) {
          errorElem_1.innerHTML = '';
        }
        validationFlag = true;
      }
    }
    if (password) {
      passwordElem.style.border = '1.5px solid #FF0212';
      passwordElem.style.boxShadow = '0px 2px 4px rgba(255, 0, 0, 0.14)';
      if (errorElem_2) {
        errorElem_2.innerHTML = '<span style="font-size: 10px;color: #FF0212;font-weight: 500;">Incorrect UserID or Password</span>';
      }
      if (validateElem_2) {
        const img = document.createElement('img');
        img.src = wrong;
        validateElem_2.innerHTML = '';
        validateElem_2.appendChild(img);
      }
    }
    if (confirm && confirmElem) {
      if (
        passwordElem.value.match(confirmElem.value) &&
        passwordElem.value !== '' &&
        confirmElem.value !== ''
      ) {
        validationFlag = true;
        if (validateElem_3) {
          const img = document.createElement('img');
          img.src = correct;
          validateElem_3.innerHTML = '';
          validateElem_3.appendChild(img);
        }
        if (errorElem_3) {
          errorElem_3.innerHTML = '';
        }
        confirmElem.style.border = '1.5px solid #CFCFCF';
        confirmElem.style.boxShadow = '0px 2px 4px rgba(166, 166, 166, 0.14)';
        console.log('match');
      } else {
        confirmElem.style.border = '1.5px solid #FF0212';
        confirmElem.style.boxShadow = '0px 2px 4px rgba(255, 0, 0, 0.14)';
        if (errorElem_3 && passwordElem.value !== '') {
          errorElem_3.innerHTML = '<span style="font-size: 10px;color: #FF0212;font-weight: 500;">Password did\'t match</span>';
        } else if (errorElem_3) {
          errorElem_3.innerHTML = '<span style="font-size: 10px;color: #FF0212;font-weight: 500;">Enter a valid Password</span>';
        }
        if (validateElem_3) {
          const img = document.createElement('img');
          img.src = wrong;
          validateElem_3.innerHTML = '';
          validateElem_3.appendChild(img);
        }
        console.log('no match');
      }
    }
  }
  return validationFlag;
}

// tslint:disable-next-line: typedef
function collapseSidebar(){
  const sidebar = document.querySelector('.basic-sidebar') as HTMLDivElement;
  const toggleButtonState = document.querySelector(
    '.custom-collapse img'
  ) as HTMLElement;
  const sidebarItems = (sidebar.querySelectorAll(
    '.sidebar-item'
  ) as unknown) as HTMLDivElement[];
  sidebar.classList.toggle('basic-sidebar-shrink');
  for (const item of sidebarItems) {
    item.classList.toggle('sidebar-item-shrink');
    if (toggleButtonState.getAttribute('rotated') === 'false') {
      const img = document.createElement('img');
      // img.src = `assets/${item.getAttribute('short-form')}.svg`;
      // item.innerHTML = '';
      // item.appendChild(img);
      item.innerHTML = item.getAttribute('short-form');
      const tooltip = document.createElement('span');
      tooltip.className = 'tooltiptext';
      tooltip.innerHTML =  item.getAttribute('full-form');
      item.appendChild(tooltip);
    } else {
      console.log('hehe', item, item.getAttribute('full-form'));
      item.innerHTML = item.getAttribute('full-form');
    }
  }
  toggleButtonState.getAttribute('rotated') === 'true'
    ? toggleButtonState.setAttribute('rotated', 'false')
    : toggleButtonState.setAttribute('rotated', 'true');
  localStorage.setItem('sidebar-status', toggleButtonState.getAttribute('rotated'));
}

// tslint:disable-next-line: typedef
function getContainerElement(target: HTMLDivElement, containerClass: string){
  while (1) {
    if (target.classList.contains(containerClass)) {
      return target;
    } else {
      target = target.parentElement as HTMLDivElement;
    }
  }
}

export { addMailEvent, validateCredentials, collapseSidebar, getContainerElement };
