package main

import (
	"fmt"
	"github.com/gorilla/mux"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"
)

var total int

func main() {
	tot := ReadFromFile("highscore")
	total, _ = strconv.Atoi(tot)
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
		_ = WriteToFile("highscore", strconv.Itoa(newval))
		tot := &total
		*tot = newval
	}
	fmt.Fprintf(w, "%v", total)
}

func WriteToFile(filename string, data string) error {
	file, err := os.Create(filename)
	if err != nil {
		return err
	}
	defer file.Close()

	_, err = io.WriteString(file, data)
	if err != nil {
		return err
	}
	return file.Sync()
}
func ReadFromFile(filename string) string {
	ret, err := ioutil.ReadFile(filename)
	if err != nil {
		return "1000" // if the file doens't exist return the default
	}
	return string(ret)
}
