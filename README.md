_Lavet af Marinus og Mads_

##API
Vi har hentet og brugt en api kaldet Face-API, som gør det muligt at genkende ansigter på mennesker, samt hvilke følelser ansigtet viser.

Vores program bruger denne api efter man har trykket start.
Programmet vil derefter bruge computerens webcam til som input og vil vise det i realtime på skærmen. En nogle sekunder vil apien begynde og skanne efter ansigter. Den vil derefter danne et visuelt overlay, som bliver lagt over videoen. 

Vi bruger derfter Philips Hue apien, som giver os mulighed for at påvirke de forskellige værdier af en eller flere pære. Når et ansigt bliver genkendt, vil den valgte pære blinke.

##BRUGER GUIDE
For at starte projektet skal det åbnes med Node.js. I terminalen skrives der node twitterAPI.js og projektet starter på din lokaleport 8080