import React, { Component } from "react";
import ReactDom from "react-dom";
import TodoList from './components/todo-list/todo-list';
import SearchPanel from './components/search-panel/search-panel';
import AppHeader from "./components/app-header/app-header";
import ItemStatusFilter from "./components/item-status-filter/item-status-filter";
import "./index.css";
import ItemAaddForm from "./components/item-add-form/item-add-form";

export default class App extends Component {
    maxId = 100;

    //state
    state = {
        todoData : [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make awesome app'),
            this.createTodoItem('Have a lunch')
        ],
        term: '', 
        filter: 'all' //active, all, done
    };

    // properties of created list
    createTodoItem(label) {
        return{
            label, 
            important:false,
            done:false,
            id:this.maxId++
        }
    };
    deleteItem = (id) => { 
        this.setState( ({todoData}) => {
            const index = todoData.findIndex( (el) => el.id === id); 
            const newArray = [...todoData.slice(0, index),
                ...todoData.slice(index + 1)];
                //this function makes new array of items without changing current state
            return {
                todoData : newArray
            };
        })
    };
    //function of adding item
    addItem = (text) => {
//this funcrion also makes new array and put it in the state without changing current
       const newItem = this.createTodoItem(text)
       this.setState( ({ todoData } ) => {
        const newArr = [
            ...todoData,
            newItem
        ]      
        return{
            todoData : newArr
        };
       })

    };
// function is define a property of item
toggleProperty(arr, id, propName){
    const index = arr.findIndex( (el) => el.id === id);
    const oldItem = arr[index];
    const newItem = {...oldItem, [propName]: !oldItem[propName]};
    //construct new array
    return [...arr.slice(0, index),
        newItem,
        ...arr.slice(index + 1)]
    
};
//item get important mark
   onToggleImportant  = (id) => {
    this.setState(({todoData}) =>{
        //update object
       return {
           todoData : this.toggleProperty(todoData, id, 'important')
       }
       });
   };
   //item get  done
   onToggleDone  = (id) => {
   this.setState(({todoData}) =>{
    //update object
   return {
       todoData : this.toggleProperty(todoData, id, 'done')
   }
   });
    console.log('done', id)
    };
    //search final setstate function
    onSearchChange = (term) => {
        this.setState({term});
    };

    //search function 
    search(items, term){
        if(term.length === 0){
            return items
    }
     return items.filter( (item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        });
    };

    //filter function 
    // we have 3 cases all(dafault item calse)
    //active and done
    //what will be displayed?
    //it depends from the button you have to click(all ,active, done)
    filter(items, filter) {
        switch(filter){
            case 'all': return items;
            case 'active' : return items.filter( (item) => !item.done);
            case 'done' : return items.filter( (item) => item.done);
            default : return items
        }
    };
    //displays filtered item
    onFilterChange = (filter) => {
        this.setState({filter})
    }
    
    render() {

        const {todoData, term, filter} = this.state;
        const visibleItems = this.filter(this.search(todoData, term), filter);
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount
        return(
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                 <div className="top-panel d-flex">
                     <ItemStatusFilter filter = {filter} 
                        onFilterChange={this.onFilterChange}
                     />
                     <SearchPanel 
                        onSearchChange={this.onSearchChange}
                     />
                </div>
                <TodoList todos={visibleItems} 
                onDeleted = { this.deleteItem}
                onToggleImportant={this.onToggleImportant}
                onToggleDone={this.onToggleDone}
                />
                <ItemAaddForm  onItemAdded = {this.addItem}/>
        </div>
        );
    }


};

ReactDom.render(<App />, document.getElementById("root"));