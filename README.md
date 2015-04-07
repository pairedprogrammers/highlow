<h1>High Low</h1>

<p>Guess if the next number will be higher or lower than the current number.  Features:</p>
<ul>
  <li>Streamlined interface to make playing multiple games in a row easy and fun</li>
  <li>Save your best score with local highscores and leaderboards</li>
  <li>Responsive design.  Play on a desktop, laptop, tablet, or smart phone!</li>
</ul>

<p><a href="http://www.keithott.com/highlow/">Check out the demo hosted at www.keithott.com</a></p>

<h1>Running High Low</h1>
<p>In order to run High Low, clone the repository.  Then run the following command. (You'll need node.js and bower already installed.  See <a href="https://nodejs.org/">nodejs.org</a> and <a href="http://bower.io/">bower.io</a> for details.)</p>
<pre>bower install</pre>

<p>Next, you'll want to sign up for a Firebase account and create a new app.  Copy/paste the permissions saved in firebase-permission.txt and put them in Firebase's "Security & Rules" page.
  Then, modify the existing Firebase URL in the following files and change it to your new app's URL:</p>
<ul>
  <li>leaderboard-reset.html</li>
  <li>scripts/HighscoreFactory.js</li>
</ul>
<p>Next, open leaderboard-reset.html in your web browser and click "Reset All Leaderboards" to initialize the high scores.  Finally, open index.html and enjoy!</p>

<h1>Why this was written</h1>
<p>This was originally written as a sample program for a series of tutorial videos by the Paired Programmers.  Watch them free here:</p>
<ul>
  <li><a href="https://www.youtube.com/watch?v=I4iB0kOSmx8">Web Storage and AngularJS</a></li>
</ul>

<h1>Follow the Paired Programmers</h1>
<ul>
  <li><a href="https://www.youtube.com/channel/UCyFgdOQhteO_EWAQKh7zOvA">Subscribe to the Paired Programmers on YouTube</a></li>
  <li><a href="https://twitter.com/PairedPrgmrs">Follow the Paired Programmers on Twitter</a></li>
</ul>

<h1>License</h1>
<p>Copyright 2015 Keith Ott</p>

<p>Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at</p>

<p><a href="http://www.apache.org/licenses/LICENSE-2.0">http://www.apache.org/licenses/LICENSE-2.0</a></p>

<p>Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.</p>
