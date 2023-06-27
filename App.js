import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";

import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import Colors from "./assets/constants/colors";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
	const [userNumber, setUserNumber] = useState(null);
	const [gameIsOver, setGameIsOver] = useState(true);
	const [guessRounds, setGuessRounds] = useState(0);

	const [fontsLoaded] = useFonts({
		"open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
		"open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
	});

	if (!fontsLoaded) {
		return <AppLoading></AppLoading>;
	}

	const pickedNumberHandler = (pickedNumber) => {
		setUserNumber(pickedNumber);
		setGameIsOver(false);
	};

	const gameOverHandler = (numberOfRounds) => {
		setGameIsOver(true);
		setGuessRounds(numberOfRounds);
	};

	const startNewGameHandler = () => {
		setUserNumber(null);
		setGuessRounds(0);
	};

	let screen = <StartGameScreen onConfirmNumber={pickedNumberHandler} />;

	if (userNumber) {
		screen = (
			<GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
		);
	}

	if (gameIsOver && userNumber) {
		screen = (
			<GameOverScreen
				userNumber={userNumber}
				roundsNumber={guessRounds}
				onStartNewGame={startNewGameHandler}
			/>
		);
	}

	return (
		<>
			<StatusBar style="light"></StatusBar>
			<LinearGradient
				colors={[Colors.primary700, Colors.accent500]}
				style={styles.rootScreen}
			>
				<ImageBackground
					source={require("./assets/images/background.png")}
					resizeMode="cover"
					style={styles.rootScreen}
					imageStyle={styles.backgroundImage}
				>
					<SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
				</ImageBackground>
			</LinearGradient>
		</>
	);
}

const styles = StyleSheet.create({
	rootScreen: {
		flex: 1,
	},
	backgroundImage: {
		opacity: 0.5,
	},
});
