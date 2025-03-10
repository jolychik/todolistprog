import React, {Component} from 'react';
import {variables} from '../Variables.js';


export class Projects extends Component{

    constructor(props) {
        super(props);

        this.state={
            GoalHasProject:[],
            modalTitle:"",
            nameGoal:"",
            nameProject:0
        }
    }

    refreshList(){
        fetch(variables.API_URL+'GhP')
            .then(response =>response.json())
            .then(data=>{
                this.setState({GoalHasProject:data});
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    changeGoalInProject=(e)=>{
        this.setState({nameGoal:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Add goal",
            nameProject:0,
            nameGoal:""
        });
    }
    editClick(dep){
        this.setState({
            modalTitle:"Edit goal in project",
            nameProject:dep.nameProject,
            nameGoal:dep.nameGoal
        });
    }

    createClick(){
        fetch(variables.API_URL+'GhP',{
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                username:this.state.username,
                name:this.state.name,
                surname:this.state.surname,
                password:this.state.password
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
        fetch(variables.API_URL+'User',{
            method: 'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                idUser:this.state.idUser,
                username:this.state.username,
                name:this.state.name,
                surname:this.state.surname,
                password:this.state.password
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
            fetch(variables.API_URL+'User/'+id,{
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
            users,
            modalTitle,
            username,
            name,
            surname,
            password,
            idUser
        }=this.state;
        return(
            <div>
                <button type={"button"}
                        className={"btn btn-primary m-2 float-end"}
                        data-bs-toggle={"modal"}
                        data-bs-target={"#modalFrame"}
                        onClick={()=>this.addClick()}>
                    Add User
                </button>
                <table className={"table table-striped"}>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Username</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Password</th>
                        <th>Operations</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(dep=>
                        <tr key={dep.idUser}>
                            <td>{dep.idUser}</td>
                            <td>{dep.username}</td>
                            <td>{dep.name}</td>
                            <td>{dep.surname}</td>
                            <td>{dep.password}</td>
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
                                        onClick={()=>this.deleteClick(dep.idUser)}>
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
                                        <span className={"input-group-text"}>Username</span>
                                        <input type={"text"} className={"form-control"} value={username}
                                               onChange={this.changeUsername}/>
                                    </div>
                                    <div className={"input-group mb-3"}>
                                        <span className={"input-group-text"}>Name</span>
                                        <input type={"text"} className={"form-control"} value={name}
                                               onChange={this.changeName}/>
                                    </div>
                                    <div className={"input-group mb-3"}>
                                        <span className={"input-group-text"}>Surname</span>
                                        <input type={"text"} className={"form-control"} value={surname}
                                               onChange={this.changeSurname}/>
                                    </div>
                                    <div className={"input-group mb-3"}>
                                        <span className={"input-group-text"}>Passowrd</span>
                                        <input type={"text"} className={"form-control"} value={password}
                                               onChange={this.changePassword}/>
                                    </div>
                                </div>
                                {idUser==0?
                                    <button type={"button"}
                                            className={"btn btn-primary float-start"}
                                            onClick={()=>this.createClick()}
                                    >Create</button>
                                    :null}

                                {idUser!=0?
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

class UserPage extends React.Component {
    render() {
        return <>
            <Projects></Projects>
        </>
    }
}


export default UserPage;