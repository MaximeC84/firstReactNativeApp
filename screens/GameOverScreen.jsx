import { Text, View, Image, StyleSheet } from "react-native";
import Title from "../components/ui/Title";
import Colors from "../assets/constants/colors";
import PrimaryButton from "./../components/ui/PrimaryButton";

const GameOverScreen = (props) => {
	return (
		<View style={styles.rootContainer}>
			<Title>GAME OVER !</Title>
			<View style={styles.imageContainer}>
				<Image
					style={styles.image}
					source={require("../assets/images/success.png")}
				></Image>
			</View>
			<Text style={styles.summaryText}>
				Your phone needed{" "}
				<Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to
				guess the number{" "}
				<Text style={styles.highlight}>{props.userNumber}</Text>.
			</Text>
			<PrimaryButton onPress={props.onStartNewGame}>
				Start New Game
			</PrimaryButton>
		</View>
	);
};

export default GameOverScreen;

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		padding: 24,
		justifyContent: "center",
		alignItems: "center",
	},
	imageContainer: {
		borderRadius: 150,
		width: 300,
		height: 300,
		borderWidth: 3,
		borderColor: Colors.primary800,
		overflow: "hidden",
		margin: 36,
	},
	image: {
		width: "100%",
		height: "100%",
	},
	summaryText: {
		fontFamily: "open-sans",
		fontSize: 24,
		textAlign: "center",
		marginBottom: 24,
	},
	highlight: {
		fontFamily: "open-sans-bold",
		color: Colors.primary500,
	},
});
