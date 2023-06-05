const ratioIndex = .1;

const options = {
    root:null,
    rootMargin:"0px",
    threshold:ratioIndex
}
const handler = function(entries, observer){
    entries.forEach(function(entry){
        if (entry.intersectionRatio > ratioIndex) {
            entry.target.classList.add("zoomin");
            entry.target.classList.remove("zoomout");
        }
    })
    // console.log("Intersector works");
}
var observer = new IntersectionObserver(handler, options);

document.querySelectorAll(".zoomout").forEach(function(elem){
    observer.observe(elem);
})
