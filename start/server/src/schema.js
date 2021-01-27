// A book has a title
const { gql } = require('apollo-server');

// An exclamation point (!) after a declared field's type means "this field's value can never be null."
const typeDefs = gql`
	"Queries"
	type Query {
		launches(
			"""
			The number of results to show. Must be >= 1. Default = 20
			"""
			pageSize: Int
			"""
			If you add a cursor here, it will only return results _after_ this cursor
			"""
			after: String
		): LaunchConnection!
		launch(id: ID!): Launch
		me: User
	}

	"Query types"
	type LaunchConnection {
		cursor: String!
		hasMore: Boolean!
		launches: [Launch]!
	}

	"Mutations"
	type Mutation {
		bookTrips(launchIds: [ID]!): TripUpdateResponse!
		cancelTrip(launchId: ID!): TripUpdateResponse!
		login(email: String): User
	}

	"Mutation return types"
	type TripUpdateResponse {
		success: Boolean!
		message: String
		launches: [Launch]
	}

	"Object types"
    type Launch {
        id: ID!
        site: String
        mission: Mission
        rocket: Rocket
        isBooked: Boolean!
	}
	
	type Rocket {
		id: ID!
		name: String
		type: String
	}
	
	type User {
		id: ID!
		email: String!
		trips: [Launch]!
		token: String
	}
	
	type Mission {
		name: String
		missionPatch(size: PatchSize): String
	}
	
	enum PatchSize {
		SMALL
		LARGE
	}
`;

module.exports = typeDefs;