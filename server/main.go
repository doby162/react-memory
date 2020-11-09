package main

import (
	"fmt"
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"strconv"
)

var total int

func main() {
	total = 1000
	r := mux.NewRouter()
	r.HandleFunc("/", landing_page)
	r.HandleFunc("/{category}", landing_page)
	http.Handle("/", r)
	r.Use(mux.CORSMethodMiddleware(r))
	log.Fatal(http.ListenAndServe(":8000", r))
}

func landing_page(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	newval, _ := strconv.Atoi(vars["category"])
	if vars["category"] != "" && newval < total {
		tot := &total
		*tot = newval
	}
	fmt.Fprintf(w, "%v", total)
}
