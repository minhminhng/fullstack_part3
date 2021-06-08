(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{23:function(e,n,t){},43:function(e,n,t){"use strict";t.r(n);var c=t(1),o=t(17),a=t.n(o),r=(t(23),t(8)),u=t(18),i=t(3),s=t(0),l=function(e){return Object(s.jsx)("form",{onChange:e.filterName,children:Object(s.jsxs)("div",{children:["filter shown with ",Object(s.jsx)("input",{value:e.value,onChange:e.handleFilterChange})]})})},d=function(e){return Object(s.jsxs)("form",{onSubmit:e.onSubmit,children:[Object(s.jsxs)("div",{children:["name: ",Object(s.jsx)("input",{value:e.name,onChange:e.handleNameChange}),Object(s.jsx)("br",{}),"number: ",Object(s.jsx)("input",{value:e.number,onChange:e.handleNumberChange})]}),Object(s.jsx)("div",{children:Object(s.jsx)("button",{type:"submit",children:e.text})})]})},b=t(5),j=t.n(b),m="/api/persons",h=function(){return j.a.get(m).then((function(e){return e.data}))},f=function(e){var n=j.a.post(m,e,{headers:{"Content-Type":"application/json"}});return console.log("addPerson",e),n.then((function(e){return e.data}))},O=function(e){return console.log("deleting ".concat(m,"/").concat(e,"...")),j.a.delete("".concat(m,"/").concat(e)).then((function(e){return e.data}))},x=function(e,n){return console.log("updating"),j.a.put("".concat(m,"/").concat(e),n).then((function(e){return e.data}))},g=function(e){var n=e.name,t=e.number,c=e.onDelete,o=e.label;return Object(s.jsxs)("tr",{children:[Object(s.jsx)("td",{children:n}),Object(s.jsx)("td",{children:t}),Object(s.jsx)("td",{children:Object(s.jsx)("button",{onClick:c,children:o})})]})},p=function(e){var n=e.persons,t=e.setPersons,c=(e.msg,e.setMsg);return Object(s.jsx)("table",{children:Object(s.jsx)("tbody",{children:n.map((function(e){return Object(s.jsx)(g,{name:e.name,number:e.number,onDelete:function(){return function(e){var o=n.filter((function(n){return n.id!==e})),a=n.find((function(n){return n.id===e}));window.confirm("Delete ".concat(a.name,"?"))&&(O(e).then((function(e){c([0,"Deleted ".concat(a.name," from the list")]),setTimeout((function(){c(null)}),3e3)})).catch((function(e){c([1,"".concat(a.name," no longer exists")]),setTimeout((function(){c(null)}),3e3)})),t(o))}(e.id)},label:"delete"},e.id)}))})})},v=function(e){var n=e.message;return null===n?null:0===n[0]?Object(s.jsx)("div",{className:"message",children:n[1]}):1===n[0]?Object(s.jsx)("div",{className:"error",children:n[1]}):void 0},w=function(){var e=Object(c.useState)([]),n=Object(i.a)(e,2),t=n[0],o=n[1],a=Object(c.useState)(""),b=Object(i.a)(a,2),j=b[0],m=b[1],O=Object(c.useState)(""),g=Object(i.a)(O,2),w=g[0],C=g[1],S=Object(c.useState)(""),L=Object(i.a)(S,2),N=L[0],k=L[1],T=Object(c.useState)(!0),P=Object(i.a)(T,2),y=P[0],D=P[1],I=Object(c.useState)(null),A=Object(i.a)(I,2),E=A[0],F=A[1];Object(c.useEffect)((function(){h().then((function(e){o(e)}))}),[]);var J=y?t:t.filter((function(e){return e.name.toLocaleLowerCase().includes(N.toLocaleLowerCase())}));return Object(s.jsxs)("div",{children:[Object(s.jsx)("h2",{children:"Phonebook"}),Object(s.jsx)(v,{message:E}),Object(s.jsx)(l,{filterName:function(e){/\S/.test(N)?D(!1):D(!0)},value:N,handleFilterChange:function(e){k(e.target.value)}}),Object(s.jsx)("h3",{children:"Add a new"}),Object(s.jsx)(d,{text:"add",onSubmit:function(e){e.preventDefault();var n=t.findIndex((function(e){return e.name.toLowerCase()===j.toLocaleLowerCase()}));if(/\S/.test(j))if(/\S/.test(w))if(-1!==n){if(window.confirm("".concat(t[n].name," is already added to phonebook, replace the old number with a new one?"))){var c={name:t[n].name,number:w};x(t[n].id,c).then((function(e){var c=Object(u.a)(t);c[n]=Object(r.a)(Object(r.a)({},c[n]),{},{number:e.number}),o(c),m(""),C(""),F([0,"Updated phone number for ".concat(e.name)]),setTimeout((function(){F(null)}),5e3)})).catch((function(e){m(""),C(""),F([1,"".concat(t[n].name," no longer exists")]),setTimeout((function(){F(null)}),3e3)}))}else m(""),C("")}else{f({name:j,number:w}).then((function(e){console.log("name",e.name),o(t.concat(e)),m(""),C(""),F([0,"Added ".concat(e.name," to the list")]),setTimeout((function(){F(null)}),5e3)})).catch((function(e){console.log(e.response.data),F([1,"".concat(e.response.data.error)]),setTimeout((function(){F(null)}),5e3)}))}else window.alert("Please add a phone number");else window.alert("Please add a name")},name:j,number:w,handleNameChange:function(e){m(e.target.value);t.findIndex((function(e){return e.name.toLocaleLowerCase()==j.toLocaleLowerCase()}))},handleNumberChange:function(e){C(e.target.value)}}),Object(s.jsx)("h3",{children:"Numbers"}),Object(s.jsx)(p,{persons:J,setPersons:o,msg:E,setMsg:F})]})};a.a.render(Object(s.jsx)(w,{}),document.getElementById("root"))}},[[43,1,2]]]);
//# sourceMappingURL=main.17c44727.chunk.js.map