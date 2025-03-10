using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using MySql.Data.MySqlClient;
using Microsoft.Extensions.Configuration;
using react_api.Models;

namespace react_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public TaskController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            //string connectionstring = "server= localhost; port=3308; username=root; password=root; database=todo;";
            string query = @"SELECT idTask, nameTask, task.description, deadLine, nameProject, status  
                            FROM todo.task, todo.project 
                            WHERE todo.task.idProject = todo.project.idProject";
            DataTable table = new DataTable();
            string MySqlDataSource = _configuration.GetConnectionString("AppCon");
            MySqlDataReader myReader;
            using (MySqlConnection myCon = new MySqlConnection(MySqlDataSource))
            {
                myCon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }


        [HttpPost]
        public JsonResult Post(TaskClass tasks)
        {
            //string connectionstring = "server= localhost; port=3308; username=root; password=root; database=todo;";
            string query = @"INSERT INTO todo.task (nameTask, description, deadLine, idProject, status) 
                            VALUES (@nameTask, @description, @deadLine, @idProject, @status)";
            DataTable table = new DataTable();
            string MySqlDataSource = _configuration.GetConnectionString("AppCon");
            MySqlDataReader myReader;
            using (MySqlConnection myCon = new MySqlConnection(MySqlDataSource))
            {
                myCon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@nameTask", tasks.nameTask);
                    myCommand.Parameters.AddWithValue("@description", tasks.description);
                    myCommand.Parameters.AddWithValue("@deadLine", tasks.deadLine);
                    myCommand.Parameters.AddWithValue("@idProject", tasks.idProject);
                    myCommand.Parameters.AddWithValue("@status", tasks.status);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Added Successfully!");
        }


        [HttpPut]
        public JsonResult Put(TaskClass tasks)
        {
            //string connectionstring = "server= localhost; port=3308; username=root; password=root; database=todo;";
            string query = @"UPDATE todo.task 
                            SET nameTask = @nameTask, description = @description, deadLine = @deadLine, idProject = @idProject, status = @status 
                            WHERE (idTask = @idTask);
";
            DataTable table = new DataTable();
            string MySqlDataSource = _configuration.GetConnectionString("AppCon");
            MySqlDataReader myReader;
            using (MySqlConnection myCon = new MySqlConnection(MySqlDataSource))
            {
                myCon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@idTask", tasks.idTask);
                    myCommand.Parameters.AddWithValue("@nameTask", tasks.nameTask);
                    myCommand.Parameters.AddWithValue("@description", tasks.description);
                    myCommand.Parameters.AddWithValue("@deadLine", tasks.deadLine);
                    myCommand.Parameters.AddWithValue("@idProject", tasks.idProject);
                    myCommand.Parameters.AddWithValue("@status", tasks.status);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Updated Successfully!");
        }


        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            //string connectionstring = "server= localhost; port=3308; username=root; password=root; database=todo;";
            string query = @"DELETE FROM todo.task WHERE (idTask = @idTask)";
            DataTable table = new DataTable();
            string MySqlDataSource = _configuration.GetConnectionString("AppCon");
            MySqlDataReader myReader;
            using (MySqlConnection myCon = new MySqlConnection(MySqlDataSource))
            {
                myCon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@idTask", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Deleted Successfully!");
        }
    }
}
