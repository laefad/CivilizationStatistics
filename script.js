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
	
	function Table(parent, id){
		
		const noColumnNameError = (name) => new Error(`[Table] Column name ${name} doesnt exist`);
		const columnNameError = (name) => new Error(`[Table] Column name ${name} already exist`);
		
		const rows = [];
		const columns = new Map();
		
		const createRow = (row) => {
			const mapping = [...columns.keys()].reduce(
				(acc, key) => Object.assign(acc, {[key] : row[key]})
				,{}
			);
			
			const tr = document.createElement("tr");
			columns.forEach(
				(property, key) => {
					const td = document.createElement("td");
					td.innerText = mapping[key] ? mapping[key] : "-";
					
					if (property.hasOwnProperty("classList"))
						td.classList.add(...property.classList);
					
					if (property.hasOwnProperty("style"))
						td.style = property.style;
					
					tr.append(td);
				}
			);
			
			return tr;
		};
		
		const createTopRow = () => {
			const tr = document.createElement("tr");
			columns.forEach(
				(property, key) => {
					const th = document.createElement("th");
					th.innerText = property.synonym ? property.synonym : key;
					th.innerText += property.otherwise ? "▼" : "▲";
					
					th.scope = "col";
					
					th.addEventListener("click", () => {
						
						property.otherwise ^= 1;
						
						this.sortByColumn(
							key, property.otherwise
						)
						.draw()
						
					});
					
					tr.append(th);
				}
			);
			return tr;
		};
		
		this.sortByColumn = (columnName, otherwise=false) => {
			if (!columns.has(columnName))
				throw new noColumnNameError(columnName);
			rows.sort(
				(a, b) => {
					const a_field = a[columnName] ? a[columnName].toString() : "";
					const b_field = b[columnName] ? b[columnName].toString() : "";
					return otherwise ? b_field.localeCompare(a_field) : a_field.localeCompare(b_field);
				}
			);
			return this;
		};
		
		this.addColumn = (columnName, propertires) => {
			if (columns.has(columnName))
				throw new columnNameError(columnName);
			columns.set(columnName, propertires);
			return this;
		};
		
		this.setColumnPropertires = (columnName, propertires) => {
			if (!columns.has(columnName))
				throw new noColumnNameError(columnName);
			columns.set(columnName, propertires);
			return this;
		};
		
		this.addRow = (row) => {
			rows.push(row);
			return this;
		};
		
		this.draw = () => {
			const table = document.createElement("table");
			table.id = id;
			
			table.append(createTopRow());
			
			rows.forEach(
				row => table.append(createRow(row))
			);
			
			let e = document.getElementById(id);
			if (e) e.remove();
			parent.append(table);
		};
		
		this.clear = () => {
			rows.splice(0,rows.length);
			columns.clear();
		};
		
		return this;
	};
	
	const table = new Table(document.getElementById("container"), "rating");
	
	const onValueUpdate = (data) => {
		table.clear();
		
		data.forEach(
			user => table.addRow(user)
		);
		
		table
		.addColumn("name", {
			synonym: "Имя игрока",
			otherwise: true
		})
		.addColumn("rating", {
			synonym: "Рейтинг",
			otherwise: true
		})
		.draw();
	};
	
	firebase.database().ref("/users/").on("value", 
		(snapshot) => onValueUpdate(
			snapshot.val()
		) 
	);
	
}))();