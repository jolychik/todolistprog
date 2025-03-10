using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react_api.Models
{
    public class TaskClass
    {
        public int idTask { get; set; }
        public string nameTask { get; set; }
        public string description { get; set; }
        public string deadLine { get; set; }
        public string idProject { get; set; }
        //тест cнизу
        public string nameProject { get; set; }
        public string status { get; set; }
    }
}
