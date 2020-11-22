function toggleProfileOption(event?: MouseEvent){
    const target = document.querySelector('.profile-options') as HTMLDivElement;
    const backdrop = document.querySelector(
      '.profile-option-backdrop'
    ) as HTMLDivElement;
    target.classList.toggle('show-select-option');
    backdrop.classList.toggle('hide');
}

function getDate(data: string){
    let date = new Date(parseInt(data.slice(0,4)), parseInt(data.slice(4,6)) - 1, parseInt(data.slice(6,8)))  
    return date.toDateString();
}

function toggleSelect(event?: MouseEvent) {
    const target = document.querySelector(
      '.option-list-container'
    ) as HTMLDivElement;
    const backdrop = document.querySelector(
      '.filter-backdrop'
    ) as HTMLDivElement;
    target.classList.toggle('show-select-option');
    backdrop.classList.toggle('hide');
    // (document.querySelector('.search-option') as HTMLInputElement).focus();
  }

export {
    toggleProfileOption, getDate, toggleSelect
}