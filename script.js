"use strict";

(() => document.addEventListener("DOMContentLoaded", () => {
	
	const firebaseConfig = {
		apiKey: "AIzaSyC0hQGMZ2Y8PGTvKFNzy9aIKkkPUSWdVpE",
		authDomain: "civ-vi-a3b50.firebaseapp.com",
		databaseURL: "https://civ-vi-a3b50-default-rtdb.europe-west1.firebasedatabase.app",
		projectId: "civ-vi-a3b50",
		storageBucket: "civ-vi-a3b50.appspot.com",
		messagingSenderId: "388579783887",
		appId: "1:388579783887:web:902f07dc74ebdad10c33ba",
		measurementId: "G-Z0XYY9Z76Y"
	};

	firebase.initializeApp(firebaseConfig);
	
	const tableMapper = new TableMapper(document.getElementById("container"));
	
	tableMapper.getTableBuilder()
		.setName("rating")
		.setSynonym("Рейтинг")
		.addColumn("name", {
			synonym: "Имя игрока",
			otherwise: true,
			sortable: false,
			sNumeric: false
		})
		.addColumn("rating", {
			synonym: "Рейтинг",
			otherwise: true,
			sortable: true,
			isNumeric: true
		})
		.addTable();
		
	tableMapper.getTableBuilder()
		.setName("wins")
		.setSynonym("Победы")
		.addColumn("name", {
			synonym: "Имя игрока",
			otherwise: true,
			sortable: false,
			isNumeric: false
		})
		.addColumn("count", {
			synonym: "Игры",
			otherwise: true,
			sortable: true,
			isNumeric: true
		})
		.addColumn("total_wins", {
			synonym: "Победы",
			otherwise: true,
			sortable: true,
			isNumeric: true
		})
		.addColumn("team_wins", {
			synonym: "Командные",
			otherwise: true,
			sortable: true,
			isNumeric: true
		})
		.addColumn("personal_wins", {
			synonym: "Одиночные",
			otherwise: true,
			sortable: true,
			isNumeric: true
		})
		.addColumn("win_rate", {
			synonym: "Win rate",
			otherwise: true,
			sortable: true,
			isNumeric: true
		})
		.addTable();
	
	// tableMapper.getTableBuilder()
	// .setName("other")
	// .setSynonym("Остальное")
	// .addColumn("name", {
		// synonym: "Имя игрока",
		// otherwise: true,
		// sortable: false,
		// isNumeric: false
	// })
	// .addColumn("highest_score_take", {
		// synonym: "Наибольшая прибавка рейтинга",
		// otherwise: true,
		// sortable: true,
		// isNumeric: true
	// })
	// .addColumn("changes", {
		// synonym: "Изменения рейтинга"
	// })
	// .addTable();
	
	const onValueUpdate = (data) => {
		
		tableMapper.clear();
		
		data.forEach(
			user => tableMapper.addRow(user)
		);
		
		tableMapper.change("rating");
	};
	
	firebase.database().ref("/users/").on("value", 
		(snapshot) => onValueUpdate(
			snapshot.val()
		) 
	);
	
}))();