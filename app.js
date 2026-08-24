document.addEventListener("DOMContentLoaded",()=>{
  const header=document.getElementById("siteHeader");
  const footer=document.getElementById("siteFooter");
  if(header) header.innerHTML=`<header class="site-header"><div class="container nav"><a class="brand" href="index.html"><span class="brand-mark">FT</span><span><b>Free Tuition</b><small>MEDIA</small></span></a><button class="menu-toggle">☰</button><nav class="main-nav"><a href="index.html">Home</a><a href="tuitions.html">Find Tuition</a><a href="tutors.html">Find Tutor</a><a href="post-tuition.html">Post a Tuition</a><a href="about.html">About</a><a class="login-link" href="login.html">Login</a><a class="btn btn-small" href="register.html">Register</a></nav></div></header>`;
  if(footer) footer.innerHTML=`<footer class="footer"><div class="container footer-grid"><div><a class="brand footer-brand" href="index.html"><span class="brand-mark">FT</span><span><b>Free Tuition</b><small>MEDIA</small></span></a><p>A platform connecting students, guardians and tutors across Bangladesh.</p></div><div><h4>Platform</h4><a href="tuitions.html">Find Tuition</a><a href="tutors.html">Find Tutor</a><a href="post-tuition.html">Post Tuition</a></div><div><h4>Company</h4><a href="about.html">About Us</a><a href="contact.html">Contact</a><a href="blog.html">Blog</a></div><div><h4>Legal</h4><a href="privacy.html">Privacy Policy</a><a href="terms.html">Terms</a></div></div><div class="container copyright">© ${new Date().getFullYear()} Free Tuition Media. All rights reserved.</div></footer>`;
  const menu=document.querySelector(".menu-toggle"); if(menu) menu.onclick=()=>document.querySelector(".main-nav").classList.toggle("open");

  const card=t=>`<article class="tuition-card"><div><div class="tuition-header"><span class="tuition-id">${t.id}</span><span class="status">${t.status}</span></div><h3>${t.title}</h3><div class="tuition-info"><p>📍 ${t.location}, ${t.area}</p><p>📚 ${t.className} · ${t.subject}</p><p>🗓 ${t.days} Days/Week · ${t.duration}</p><p>💰 ৳${t.salary.toLocaleString()}/month</p></div></div><a class="view-btn" href="tuition-details.html?id=${t.id}">View Details</a></article>`;

  const featured=document.getElementById("featuredTuitions"); if(featured) featured.innerHTML=tuitionData.slice(0,3).map(card).join("");

  const list=document.getElementById("tuitionList");
  const renderTuitions=()=>{
    if(!list) return;
    const keyword=(document.getElementById("keyword")?.value||"").toLowerCase();
    const loc=document.getElementById("filterLocation")?.value||"";
    const cls=document.getElementById("filterClass")?.value||"";
    const sub=document.getElementById("filterSubject")?.value||"";
    const gender=document.getElementById("filterGender")?.value||"";
    const result=tuitionData.filter(t=>(!keyword||`${t.title} ${t.subject} ${t.location}`.toLowerCase().includes(keyword))&&(!loc||t.location===loc)&&(!cls||t.className===cls)&&(!sub||t.subject===sub)&&(!gender||gender==="Any"||t.tutorGender===gender));
    list.innerHTML=result.length?result.map(card).join(""):`<div class="empty">No tuition found for the selected filters.</div>`;
    const count=document.getElementById("resultCount"); if(count) count.textContent=`${result.length} result${result.length!==1?"s":""}`;
  };
  ["keyword","filterLocation","filterClass","filterSubject","filterGender"].forEach(id=>document.getElementById(id)?.addEventListener("input",renderTuitions));
  document.getElementById("clearFilters")?.addEventListener("click",()=>{["keyword","filterLocation","filterClass","filterSubject","filterGender"].forEach(id=>{const e=document.getElementById(id);if(e)e.value=""});renderTuitions()});
  renderTuitions();

  document.getElementById("heroSearch")?.addEventListener("submit",e=>{
    e.preventDefault(); const f=new FormData(e.target); const q=new URLSearchParams({location:f.get("location"),className:f.get("className"),subject:f.get("subject")}); location.href="tuitions.html?"+q.toString();
  });
  const params=new URLSearchParams(location.search);
  if(list){["location","className","subject"].forEach(k=>{const id={location:"filterLocation",className:"filterClass",subject:"filterSubject"}[k];const v=params.get(k);if(v&&document.getElementById(id))document.getElementById(id).value=v});renderTuitions()}

  const detail=document.getElementById("tuitionDetail");
  if(detail){const t=tuitionData.find(x=>x.id===params.get("id"))||tuitionData[0];detail.innerHTML=`<div class="detail-card"><span class="eyebrow">${t.id}</span><h1>${t.title}</h1><p>${t.description}</p><div class="detail-meta"><div class="meta-box"><small>Location</small><strong>${t.location}, ${t.area}</strong></div><div class="meta-box"><small>Class</small><strong>${t.className}</strong></div><div class="meta-box"><small>Subject</small><strong>${t.subject}</strong></div><div class="meta-box"><small>Medium</small><strong>${t.medium}</strong></div><div class="meta-box"><small>Days / Week</small><strong>${t.days}</strong></div><div class="meta-box"><small>Salary</small><strong>৳${t.salary.toLocaleString()}</strong></div></div><h3>Tuition Requirements</h3><p>Student: ${t.studentGender}<br>Tutor preference: ${t.tutorGender}<br>Duration: ${t.duration}</p><button class="btn" onclick="alert('Application demo: connect this button to your backend/API.')">Apply for Tuition</button></div>`}

  const tutorList=document.getElementById("tutorList");
  const renderTutors=()=>{if(!tutorList)return;const q=(document.getElementById("tutorKeyword")?.value||"").toLowerCase(),s=document.getElementById("tutorSubject")?.value||"";const arr=tutorData.filter(t=>(!q||`${t.name} ${t.subject} ${t.location}`.toLowerCase().includes(q))&&(!s||t.subject===s));tutorList.innerHTML=arr.map(t=>`<article class="tutor-card"><div class="avatar">${t.initials}</div><h3>${t.name}</h3><p>${t.university}</p><div><span class="tag">${t.subject}</span><span class="tag">${t.location}</span></div><p>⭐ ${t.rating} · ${t.experience}</p><a class="view-btn" href="tutor-profile.html?id=${t.id}">View Profile</a></article>`).join("")||`<div class="empty">No tutors found.</div>`};
  ["tutorKeyword","tutorSubject"].forEach(id=>document.getElementById(id)?.addEventListener("input",renderTutors));renderTutors();

  const profile=document.getElementById("tutorProfile");if(profile){const t=tutorData.find(x=>x.id===params.get("id"))||tutorData[0];profile.innerHTML=`<div class="profile"><div><div class="profile-avatar">${t.initials}</div></div><div><span class="eyebrow">Tutor Profile</span><h1>${t.name}</h1><p>⭐ ${t.rating} · ${t.experience} experience</p><h3>Education</h3><p>${t.university}</p><h3>Subjects & Location</h3><p><span class="tag">${t.subject}</span><span class="tag">${t.location}</span></p><h3>About</h3><p>${t.bio}</p><button class="btn" onclick="alert('Contact flow demo. Connect this to your backend/OTP system.')">Contact Tutor</button></div></div>`}

  const success=(form,msg="Submitted successfully.")=>{form.reset();const box=document.getElementById("formMessage");if(box)box.innerHTML=`<div class="message">${msg}</div>`};
  document.getElementById("postTuitionForm")?.addEventListener("submit",e=>{e.preventDefault();success(e.target,"Your tuition request has been submitted for review. This demo does not store data yet.")});
  document.getElementById("contactForm")?.addEventListener("submit",e=>{e.preventDefault();success(e.target,"Thanks. Your message has been recorded in this demo.")});
  document.getElementById("registerForm")?.addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.target);if(f.get("password")!==f.get("confirm")){document.getElementById("formMessage").innerHTML='<div class="message error">Passwords do not match.</div>';return}success(e.target,"Registration demo complete. Connect this form to WordPress/API before production.")});
  document.getElementById("loginForm")?.addEventListener("submit",e=>{e.preventDefault();success(e.target,"Login demo submitted. Add real authentication before launch.")});
});