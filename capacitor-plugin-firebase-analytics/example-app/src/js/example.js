import { FirebaseAnalytics } from 'capacitor-plugin-firebase-analytics';

window.testEcho = () => {
    const inputValue = document.getElementById("echoInput").value;
    FirebaseAnalytics.echo({ value: inputValue })
}
