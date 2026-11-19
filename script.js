(() => {
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
  const toggle = document.querySelector('.menu-toggle');
  const mobile = document.getElementById('mobile-nav');
  function closeMenu() { if (!toggle || !mobile) return; mobile.hidden = true; toggle.setAttribute('aria-expanded','false'); toggle.setAttribute('aria-label','Open navigation menu'); }
  if (toggle && mobile) {
    toggle.addEventListener('click', () => {
      const shouldOpen = mobile.hidden;
      mobile.hidden = !shouldOpen;
      toggle.setAttribute('aria-expanded', String(shouldOpen));
      toggle.setAttribute('aria-label', shouldOpen ? 'Close navigation menu' : 'Open navigation menu');
    });
    mobile.querySelectorAll('a').forEach(a => a.addEventListener('click',closeMenu));
    document.addEventListener('keydown', e => {if(e.key === 'Escape') closeMenu();});
  }
  const enquiry = document.getElementById('enquiry-form');
  if(enquiry) enquiry.addEventListener('submit', e => {
    e.preventDefault();
    if (!enquiry.reportValidity()) return;
    const f = new FormData(enquiry);
    const msg = `Hello JAFECO Construction, I'd like to make a project enquiry.\n\nName: ${f.get('name')}\nPhone: ${f.get('phone')}\nService: ${f.get('service')}\n\nProject details:\n${f.get('message')}`;
    const url = `https://wa.me/2348034578343?text=${encodeURIComponent(msg)}`;
    const newTab = window.open(url,'_blank','noopener,noreferrer');
    if (!newTab) window.location.href = url;
  });
  const requestForm = document.getElementById('request-form');
  const modes = {
    consultation: {title:'Book a consultation', description:'Tell us about your project and request a consultation with JAFECO.', short:'Consultation', detail:'What would you like to discuss?'},
    enquiries: {title:'General enquiries', description:'Ask about JAFECO services, project scope or our nationwide operations.', short:'General Enquiry', detail:'What would you like to know?'},
    partnership: {title:'Explore a partnership', description:'Tell us about your organisation and your proposed collaboration.', short:'Partnership Enquiry', detail:'Tell us about your proposed partnership.'},
    quotation: {title:'Request a quotation', description:'Share your project scope and location to start a quotation discussion.', short:'Quotation Request', detail:'Describe the work to be priced, location, dimensions and timeline.'},
    zoom: {title:'Request a Zoom meeting', description:'Propose a date and time in West Africa Time for an online project meeting.', short:'Zoom Meeting Request', detail:'What should the meeting cover?'}
  };
  if(requestForm){
    const params = new URLSearchParams(window.location.search);
    const type = Object.hasOwn(modes, params.get('type')) ? params.get('type') : 'enquiries';
    const topic = params.get('topic') === 'investment' && type === 'zoom' ? 'investment' : '';
    const mode = topic ? {...modes.zoom, title:'Request an investment Zoom meeting', description:'Propose a meeting with JAFECO Construction to discuss a potential investment or development opportunity.', short:'Investment Zoom Meeting Request', detail:'Which investment idea or development opportunity would you like to discuss?'} : modes[type];
    document.title = mode.title + ' | JAFECO Construction';
    document.getElementById('request-heading').textContent = mode.title;
    document.getElementById('request-description').textContent = mode.description;
    document.getElementById('request-kicker').textContent = mode.short.toUpperCase();
    document.getElementById('form-heading').textContent = mode.title + '.';
    document.getElementById('message-label').firstChild.textContent = mode.detail+' ';
    document.getElementById('meeting-fields').hidden = type !== 'zoom';
    document.getElementById('budget-field').hidden = type !== 'quotation';
    document.getElementById('organisation-field').hidden = type !== 'partnership';
    if(type === 'zoom'){
      const date = requestForm.elements['meeting_date'];
      date.required = true;
      date.min = new Date(Date.now() - new Date().getTimezoneOffset()*60000).toISOString().split('T')[0];
      requestForm.elements['meeting_time'].required = true;
    }
    requestForm.addEventListener('submit',e=>{
      e.preventDefault(); if(!requestForm.reportValidity())return;
      const form = new FormData(requestForm);
      const parts = [`Hello JAFECO Construction, I am submitting a ${mode.short.toLowerCase()}.`,
        `Name: ${form.get('name')}`, `Phone: ${form.get('phone')}`,
        `Email: ${form.get('email') || 'Not provided'}`, `Location: ${form.get('location')}`,
        `Service: ${form.get('service')}`];
      if(topic==='investment')parts.push('Meeting purpose: Investment / development discussion');
      if(type==='zoom')parts.push(`Preferred Zoom date: ${form.get('meeting_date')}`,`Preferred time (WAT): ${form.get('meeting_time')}`);
      if(type==='quotation' && form.get('budget'))parts.push(`Estimated budget: ${form.get('budget')}`);
      if(type==='partnership' && form.get('organisation'))parts.push(`Organisation: ${form.get('organisation')}`);
      parts.push(`\n${mode.detail}\n${form.get('message')}`);
      const url='https://wa.me/2348034578343?text='+encodeURIComponent(parts.join('\n'));
      const tab=window.open(url,'_blank','noopener,noreferrer');
      if(!tab)window.location.href=url;
    });
  }
  const investmentForm=document.getElementById('investment-form');
  if(investmentForm){
    investmentForm.addEventListener('submit',e=>{
      e.preventDefault();
      if(!investmentForm.reportValidity()) return;
      const form=new FormData(investmentForm);
      const parts=[
        'Hello JAFECO Construction, I would like to express my interest in discussing a potential investment opportunity.',
        `Full name: ${form.get('name')}`,
        `Phone: ${form.get('phone')}`,
        `Email: ${form.get('email')}`,
        `Organisation: ${form.get('organisation')||'Not provided'}`,
        `Location: ${form.get('location')}`,
        `Area of interest: ${form.get('interest')}`,
        `Indicative range: ${form.get('range')||'To be discussed'}`,
        `Preferred engagement: ${form.get('engagement')}`,
        `\nProposal / discussion details:\n${form.get('message')}`,
        '\nI understand this is a non-binding initial enquiry.'
      ];
      const url='https://wa.me/2348034578343?text='+encodeURIComponent(parts.join('\n'));
      const tab=window.open(url,'_blank','noopener,noreferrer');
      if(!tab) window.location.href=url;
    });
  }
  const complaintForm=document.getElementById('complaint-form');
  if(complaintForm){
    const photos=document.getElementById('complaint-images');
    const msg=document.getElementById('upload-feedback');
    const err=document.getElementById('complaint-error');
    const validate=()=>{
      const files=[...photos.files];
      const total=files.reduce((n,f)=>n+f.size,0);
      const valid=files.length<=3 && total<=10*1024*1024 && files.every(f=>['image/jpeg','image/png','image/webp'].includes(f.type));
      msg.textContent=files.length?`${files.length} image(s), ${(total/1048576).toFixed(2)} MB selected. ${valid?'Ready to attach.':'Please select up to 3 JPG/PNG/WebP images, 10 MB total.'}`:'Optional. Up to 3 images, 10 MB total.';
      photos.setCustomValidity(valid?'':'Please use up to 3 JPG/PNG/WebP images, 10 MB total.');
      return valid;
    };
    photos.addEventListener('change',validate);
    complaintForm.addEventListener('submit',e=>{
      err.hidden=true;
      if(!validate()){
        e.preventDefault();err.textContent='The selected images exceed the allowed number, size or file type.';err.hidden=false;photos.reportValidity();
      }
    });
  }
})();
