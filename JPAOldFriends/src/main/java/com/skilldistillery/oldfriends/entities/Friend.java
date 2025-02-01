package com.skilldistillery.oldfriends.entities;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "friend")
public class Friend {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String name;
	
	private String type;
	
	private String description;
	
	@Column(name = "arrival_date")
	private int arrivalYear;
	
	@Column(name = "depart_date")
	private int departYear;
	
	@Column(name = "image_url")
	private String imageUrl;

	public Friend() {
		super();
	}
	
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getArrivalYear() {
		return arrivalYear;
	}

	public void setArrivalYear(int arrivalDate) {
		this.arrivalYear = arrivalDate;
	}

	public int getDepartYear() {
		return departYear;
	}

	public void setDepartYear(int departDate) {
		this.departYear = departDate;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Friend other = (Friend) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "Friend [id=" + id + ", name=" + name + ", type=" + type + ", description=" + description
				+ ", arrivalDate=" + arrivalYear + ", departDate=" + departYear + ", imageUrl=" + imageUrl + "]";
	}
	
}
