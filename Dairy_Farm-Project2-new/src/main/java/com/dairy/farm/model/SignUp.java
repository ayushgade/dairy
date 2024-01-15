package com.dairy.farm.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SignUp {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long  id ;
	private String name;
	private String email;
	private String password;
	
}
