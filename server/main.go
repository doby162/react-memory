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
	r := mux.NewRouter()
	r.HandleFunc("/", landing_page)
	r.HandleFunc("/{category}", landing_page)
	http.Handle("/", r)
	log.Fatal(http.ListenAndServe(":8000", r))
}

func landing_page(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	w.WriteHeader(http.StatusOK)
	if vars["category"] != "" {
		tot := &total
		*tot, _ = strconv.Atoi(vars["category"])
		fmt.Fprintf(w, "<p>hello world %v</p>", total)
	} else {
		fmt.Fprintf(w, "<p>hello world %v</p>", total)
	}
}
