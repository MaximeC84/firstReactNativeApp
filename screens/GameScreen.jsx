import {
	View,
	StyleSheet,
	Alert,
	Text,
	FlatList,
	useWindowDimensions,
} from "react-native";
import Title from "../components/ui/Title";
import { useEffect, useState } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "../components/game/GuessLogItem";

const generateRandomBetween = (min, max, exclude) => {
	const rndNum = Math.floor(Math.random() * (max - min)) + min;

	if (rndNum === exclude) {
		return generateRandomBetween(min, max, exclude);
	} else {
		return rndNum;
	}
};

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = (props) => {
	const initialGuess = generateRandomBetween(1, 100, props.userNumber);
	const [currentGuess, setCurrentGuess] = useState(initialGuess);
	const [guessRounds, setGuessRounds] = useState([initialGuess]);

	const { width, height } = useWindowDimensions();

	useEffect(() => {
		if (currentGuess === props.userNumber) {
			props.onGameOver(guessRounds.length);
		}
	}, [currentGuess, props.userNumber, props.onGameOver]);

	useEffect(() => {
		minBoundary = 1;
		maxBoundary = 100;
	}, []);

	const nextGuessNumber = (direction) => {
		if (
			(direction === "lower" && currentGuess < props.userNumber) ||
			(direction === "greater" && currentGuess > props.userNumber)
		) {
			Alert.alert("Don't lie!", "You know that this is wrong...", [
				{ text: "Sorry!", style: "cancel" },
			]);
			return;
		}

		if (direction === "lower") {
			//"lower", "greater"
			maxBoundary = currentGuess;
		} else if (direction === "greater") {
			minBoundary = currentGuess + 1;
		}
		const newRndNumber = generateRandomBetween(
			minBoundary,
			maxBoundary,
			currentGuess
		);

		setCurrentGuess(newRndNumber);
		setGuessRounds((prevGuessRounds) => [newRndNumber, ...prevGuessRounds]);
	};

	const guessRoundsListLength = guessRounds.length;

	let content = (
		<>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card>
				<InstructionText style={styles.instructionText}>
					Higher or Lower ?
				</InstructionText>
				<View style={styles.buttonsContainer}>
					<View style={styles.buttonContainer}>
						<PrimaryButton onPress={nextGuessNumber.bind(this, "lower")}>
							<Ionicons name="md-remove" size={24} color={"white"}></Ionicons>
						</PrimaryButton>
					</View>
					<View style={styles.buttonContainer}>
						<PrimaryButton onPress={nextGuessNumber.bind(this, "greater")}>
							<Ionicons name="md-add" size={24} color={"white"}></Ionicons>
						</PrimaryButton>
					</View>
				</View>
			</Card>
		</>
	);

	if (width > 500) {
		content = (
			<>
				<View style={styles.buttonsContainerWide}>
					<View style={styles.buttonContainer}>
						<PrimaryButton onPress={nextGuessNumber.bind(this, "lower")}>
							<Ionicons name="md-remove" size={24} color={"white"}></Ionicons>
						</PrimaryButton>
					</View>

					<NumberContainer>{currentGuess}</NumberContainer>

					<View style={styles.buttonContainer}>
						<PrimaryButton onPress={nextGuessNumber.bind(this, "greater")}>
							<Ionicons name="md-add" size={24} color={"white"}></Ionicons>
						</PrimaryButton>
					</View>
				</View>
			</>
		);
	}

	return (
		<View style={styles.screen}>
			<Title>Opponent's Guess</Title>
			{content}
			<View style={styles.flatListContainer}>
				{/* {guessRounds.map((guessRound) => (
					<Text key={guessRound}>{guessRound}</Text>
				))} */}
				<FlatList
					data={guessRounds}
					renderItem={(itemData) => (
						<GuessLogItem
							roundNumber={guessRoundsListLength - itemData.index}
							guess={itemData.item}
						/>
					)}
					keyExtractor={(item) => {
						return item;
					}}
				/>
			</View>
		</View>
	);
};

export default GameScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 24,
		alignItems: "center",
	},
	buttonsContainerWide: {
		flexDirection: "row",
		alignItems: "center",
	},
	buttonsContainer: {
		flexDirection: "row",
	},

	buttonContainer: {
		flex: 1,
	},
	instructionText: {
		marginBottom: 12,
	},
	flatListContainer: {
		flex: 1,
		padding: 16,
	},
});
