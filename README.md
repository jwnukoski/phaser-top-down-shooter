# Phaser Top Down Shooter
This was a project that I started to create a light top down shooter - taking inspiration from games like [Take No Prisoners](https://en.wikipedia.org/wiki/Take_No_Prisoners_(video_game)), [Hotline Miami](https://en.wikipedia.org/wiki/Hotline_Miami), and [Shadowrun](https://en.wikipedia.org/wiki/Shadowrun_(1993_video_game)).  

I have since stopped active development on this project for reasons outlined below.  
However, a built Docker image is available for demo purposes.  

## Screenshot
![game screenshot](/screenshot.png)

## Docker Image
A prebuilt Docker Hub image is available [here](https://hub.docker.com/repository/docker/jwnukoski/phaser-top-down-shooter/general).  
As noted above, this doesn't represent finished work.

## Phaser
### Why I chose Phaser
I figured this would be a fun experiment to try out using [Phaser.io](https://phaser.io/) framework on a complex idea such as this.  
Being already familiar with JavaScript, and wanting a multi-platform game, I thought this might be a good choice.  
Also, there are no licensing fees (*cough*... [Unity](https://unity.com/)).

### Why I'm leaving Phaser
**The below are simply opinions, and what didn't work for my workflow.**  
I think it's clear with games like the early version of [Vampire Survivors](https://en.wikipedia.org/wiki/Vampire_Survivors) that this can be a viable option for game development.  
However, there are performance implications when using JavaScript for games.

- The docs are decent for the framework, but anything beyond surface level tutorials are simply not there yet.   
- Using [Tiled](https://www.mapeditor.org/) is alright, but you're left with also parsing your own map data.
- I'm not sure why collision and layering has to be so hard to implement with just rigid sprites, but I assume this is my own lack of research. However, I think a game engine/framework should be intuitive enough to not 'get in the way' so much with developement. I'm sure some people will disagree with me here.
- I did not explore the [Phaser editor](https://phaser.io/shop/apps/phaser-editor).

The future plan would be to try this project on a different engine/framework such as [Godot](https://godotengine.org/). 
  