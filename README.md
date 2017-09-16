##Final Project: CloudCut (CineMeow)
Andrew Dempsey, Max Smiley, Pattra Audcharevorakul  
December 10, 2013

**What is CloudCut?**

CloudCut (previously CineMeow) is an in-browser video editor that allows users to store their videos on the cloud and edit their videos on-the-go. The prototype is located at [cinemeow.herokuapp.com](cinemeow.herokueapp.com).

**What did we accomplish?**

We overcame bandwidth issues by representing video manipulation via text-based meta-data, rather than directly altering large video files themselves. We were also successful in taking this meta-data, quickly serving the resulting edits back to the user, and playing them back seamlessly on the browser. (For more information, view our presentation!)

**What improvements can we make?**

Improving the user interface would be our main next step. Initially, this was not a particularly high priority, but once we finished solving the meat of the engineering issue, we realized that creating an intuitive video editing user interface was yet another a tricky and time-consuming task. Our current interface is functional, but honestly, pretty wonky.

Below is a list of our next steps:

- Designing & implementing UI improvements (naming clips, reordering, deleting clips, making a functional timeline)
- Creating a user login system
- Password protecting projects & user profiles
- Making simultaneous video editing more apparent (currently multiple users can edit video at the same time, though chances that appear may seem to be somewhat phantasmic... spectral, at best)
- Improving efficiency & cleanliness of our code
