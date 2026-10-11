const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduced && 'IntersectionObserver' in window){
 const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('revealed');observer.unobserve(entry.target);}}},{threshold:.12});
 document.querySelectorAll('.contact-area').forEach(el=>observer.observe(el));
}
