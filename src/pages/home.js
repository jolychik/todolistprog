import React, {Component} from 'react';
import {variables} from '../Variables.js';
import projects from "./projects";
import * as task from "react-bootstrap/ElementChildren";
//test

export class Home extends Component{

    constructor(props) {
        super(props);

        this.state={
            tasks:[],
            projects:[],
            modalTitle:"",
            nameTask:"",
            description:"",
            deadLine:"",
            idProject:"",
            nameProject:"",
            status:"",
            idTask:0
        }
    }

    refreshList(){
        fetch(variables.API_URL+'Project')
            .then(response =>response.json())
            .then(data=>{
                this.setState({projects:data});
            });
        fetch(variables.API_URL+'Task')
            .then(response =>response.json())
            .then(data=>{
                this.setState({tasks:data});
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    changeNameTask=(e)=>{
        this.setState({nameTask:e.target.value});
    }
    changeDescription=(e)=>{
        this.setState({description:e.target.value});
    }
    changeDeadline=(e)=>{
        this.setState({deadLine:e.target.value});
    }
    changeStatus=(e)=>{
        this.setState({status:e.target.value});
    }
    changeProjectName=(e)=>{
        this.setState({idProject:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Add Task",
            idTask:0,
            nameTask:"",
            description:"",
            deadLineNew:"",
            idProject:"",
            //nameProject:"",
            status:""
        });
    }
    editClick(dep){
        this.setState({
            modalTitle:"Edit Task",
            idTask:dep.idTask,
            nameTask:dep.nameTask,
            description:dep.description,
            deadLine:dep.deadLine,
            nameProject:dep.nameProject,
            status:dep.status
        });
    }

    createClick(){
        fetch(variables.API_URL+'Task',{
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                nameTask:this.state.nameTask,
                description:this.state.description,
                deadLine:this.state.deadLine,
                idProject:this.state.idProject,
                status:this.state.status
            })
        })
            .then(res=>res.json())
            .then((result)=>{
                alert(result);
                this.refreshList();
            },(error)=>{
                alert('Failed');
            })
    }

    updateClick(){
        fetch(variables.API_URL+'Task',{
            method: 'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                idTask:this.state.idTask,
                nameTask:this.state.nameTask,
                description:this.state.description,
                deadLine:this.state.deadLine,
                idProject:this.state.idProject,
                status:this.state.status
            })
        })
            .then(res=>res.json())
            .then((result)=>{
                alert(result);
                this.refreshList();
            },(error)=>{
                alert('Failed');
            })
    }

    deleteClick(id){
        if(window.confirm('Delete?')){
            fetch(variables.API_URL+'Task/'+id,{
                method: 'DELETE',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
                .then(res=>res.json())
                .then((result)=>{
                    alert(result);
                    this.refreshList();
                },(error)=>{
                    alert('Failed');
                })
        }
    }

    render() {
        const{
            tasks,
            modalTitle,
            nameTask,
            description,
            deadLine,
            idProject,
            nameProject,
            status,
            idTask
        }=this.state;
        return(
            <div>
                <button type={"button"}
                        className={"btn btn-primary m-2 float-end"}
                        data-bs-toggle={"modal"}
                        data-bs-target={"#modalFrame"}
                        onClick={()=>this.addClick()}>
                    Add Task
                </button>


                {/*<div>
                    <div className={"row"}>
                    <div className={"col-md-1 text-bg-primary m-1"}>ID</div>
                    <div className={"col-md-1 text-bg-dark m-1"}>Task name</div>
                    <div className={"col-md-1 text-bg-primary m-1"}>Description</div>
                    <div className={"col-md-1 col-sm-1 text-bg-dark m-1"}>Deadline</div>
                    <div className={"col-md-1 col-sm-1 text-bg-primary m-1"}>Project name</div>
                    <div className={"col-md-1 col-sm-1 text-bg-dark m-1"}>Status</div>
                    </div>
                    {tasks.map(dep=>
                <div className={"row"} key={dep.idTask}>
                        <div className={"col-md-1 col-sm-1 text-bg-primary m-1"}>{dep.idTask}</div>
                        <div className={"col-md-1 col-sm-1 text-bg-dark m-1"}>{dep.nameTask}</div>
                        <div className={"col-md-1 col-sm-1 text-bg-primary m-1"}>{dep.description}</div>
                        <div className={"col-md-1 col-sm-1 text-bg-dark m-1"}>{dep.deadLineNew}</div>
                        <div className={"col-md-1 col-sm-1 text-bg-primary m-1"}>{dep.nameProject}</div>
                        <div className={"col-md-1 col-sm-1 text-bg-dark m-1"}>{dep.status}</div>
                </div>
                    )}
                </div>*/}


                <table className={"table table-striped"}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Task name</th>
                        <th>Description</th>
                        <th>Deadline</th>
                        <th>Project name</th>
                        <th>Status</th>
                        <th>Operations</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tasks.map(dep=>
                        <tr key={dep.idTask}>
                            <td>{dep.idTask}</td>
                            <td>{dep.nameTask}</td>
                            <td>{dep.description}</td>
                            <td>{dep.deadLineNew}</td>
                            <td>{dep.nameProject}</td>
                            <td>{dep.idProject}</td>
                            <td>{dep.status}</td>
                            <td>
                                <button type="button" className={"btn btn-light mr-1"}
                                        data-bs-toggle={"modal"}
                                        data-bs-target={"#modalFrame"}
                                        onClick={()=>this.editClick(dep)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path
                                            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd"
                                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                    </svg>
                                </button>

                                <button type="button" className={"btn btn-light mr-1"}
                                        onClick={()=>this.deleteClick(dep.idTask)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-trash" viewBox="0 0 16 16">
                                        <path
                                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                        <path fillRule="evenodd"
                                              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>

                <div className={"modal fade"} id={"modalFrame"} tabIndex={"-1"} aria-hidden={"true"}>
                    <div className={"modal-dialog modal-lg modal-dialog-centered"}>
                        <div className={"modal-content"}>
                            <div className={"modal-header"}>
                                <h5 className={"modal-title"}>{modalTitle}</h5>
                                <button type={"button"} className={"btn-close"} data-bs-dismiss={"modal"} aria-label="close"></button>
                            </div>
                            <div className={"modal-body"}>
                                <div className={"input-group mb-3"}>
                                    <div className={"input-group mb-3"}>
                                        <span className={"input-group-text"}>Task name</span>
                                        <input type={"text"} className={"form-control"} value={nameTask}
                                               onChange={this.changeNameTask}/>
                                    </div>
                                    <div className={"input-group mb-3"}>
                                        <span className={"input-group-text"}>Description</span>
                                        <input type={"text"} className={"form-control"} value={description}
                                               onChange={this.changeDescription}/>
                                    </div>
                                    <div className={"input-group mb-3"}>
                                        <span className={"input-group-text"}>Deadline</span>
                                        <input type={"date"} className={"form-control"} value={deadLine}
                                               onChange={this.changeDeadline}/>
                                    </div>
                                    <div className={"input-group mb-3"}>
                                        <span className={"input-group-text"}>Project name</span>
                                        <select className={"input-group-text"}
                                                onChange={this.changeProjectName}
                                                value={idProject}>
                                            {tasks.map(dep=><option key={dep.idProject}>
                                                {dep.nameProject}
                                            </option>)}
                                        </select>
                                    </div>
                                    <div className={"input-group mb-3"}>
                                        <span className={"input-group-text"}>Status</span>
                                        <select className={"form-control"} value={status} onChange={this.changeStatus}>
                                            <option value="Complete">Complete</option>
                                            <option value="In process">In process</option>
                                            <option value="1st month">1st month</option>
                                        </select>
                                        {/*<input type={"text"} className={"form-control"} value={status}
                                               onChange={this.changeStatus}/>*/}
                                    </div>
                                </div>
                                {idTask==0?
                                    <button type={"button"}
                                            className={"btn btn-primary float-start"}
                                            onClick={()=>this.createClick()}
                                    >Create</button>
                                    :null}

                                {idTask!=0?
                                    <button type={"button"}
                                            className={"btn btn-primary float-start"}
                                            onClick={()=>this.updateClick()}
                                    >Update</button>
                                    :null}
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
class HomePage extends React.Component {
    render() {
        return <>
            <Home></Home>
        </>
    }
}


export default HomePage;