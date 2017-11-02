var ps = require('../index.js');

// A simple pid lookup
ps.lookup({
  command: '',
  psargs: 'uxc'
}, function(err, resultList ) {
  if (err) {
    throw new Error( err );
  }

  console.log("USER \t PID \t %CPU \t %MEM \t VSZ \t RSS \t TTY \t STAT \t START \t TIME \t COMMAND");
  console.log(resultList);




  /*
  resultList.forEach(function( process ){
    if( process ){
      console.log("%s \t %s \t %s \t %s \t %s \t %s \t %s \t %s \t %s \t %s \t %s",
                  process.user, process.pid, process.cpu, process.mem, process.vsz, process.rss, process.tty, process.stat, process.start, process.time, process.command);

      //console.log( 'PID: %s, COMMAND: %s, CPU: %s, USER: %s', process.pid, process.command, process.cpu, process.user);
      //console.log("USER \t PID \t %CPU \t %MEM \t VSZ \t RSS \t TTY \t STAT \t START \t TIME \t COMMAND");


    }
  });
  */
});
