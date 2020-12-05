# ubiquitous-waffle
My Brother and I made this to help our dad do an online demonstration of human-body Center of Mass for his biomechanics students. 

The app steps students through identifying segments of the human body in a photo and then calculates a likely center of mass from the photo. 

# Example Output

![Photo of a person roller skating, but their joints have been overlayed with yellow dots and blue skeleton lines. A Green dot shows their center of mass as calculated by the app in this repository](https://raw.githubusercontent.com/fire-wally/ubiquitous-waffle/master/center-of-mass(3).png)

# Live Demo

There's a hosted version here on Netlify: https://dreamy-benz-b3c613.netlify.app/sample.html

# Requirements

* User can choose a picture from their PC
* User can then select the location of the following nodes
  * Top of Head
  * Chin-Neck Intersect
  * Right Shoulder
  * Right Elbow
  * Right Wrist
  * Right Hand
  * Left Shoulder
  * Left Elbow
  * Left Wrist
  * Left Hand
  * Right Hip
  * Right Knee
  * Right Ankle
  * Right 5th Met
  * Left Hip
  * Left Knee
  * Left Ankle
  * Left 5th Met
* User sees "joints" and "bones" drawn on the photo
* User confirms selection by button press
* System calculates the center-of-mass of the resulting skeleton
* User can save annotated photo back to their PC
