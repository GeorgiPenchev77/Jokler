## Description

The advanced idea in our project is closely related with the ```Hashtag``` entity. 
We are planning to implement a recommendation algorithm that individually creates a "For You" page for each individual user.

## Definitions 

Before we get into implementation, we need to define some concepts:

- **Interest rate between user U and #A** (written as IR(U, #A)) is a prediction, representing how interested user `U` is in `#A`. We say that the user is interested in `#A` if they interact with the jokles, containing `#A`, in any way: commenting, disliking or rejokling the jokle("jokle" is the name of post in Jokler application), each having their own impact on the interest rate. 
IR(U, #A) values varies from `0` to `1`, where `0` means the user is predicted to interact with the jokle, containing  `#A`, with 0% chance, and `1` – with 100% chance.


- **"Interest rate between #A and #B)** (written as IR(#A, #B)) is a prediction model, representing how likely the user U, with 
`IR(U, #A) = 1`, is interested in `#B`. That is, what is the IR(U, #B) for a User U with IR(U, #A) = 1. IR(#A, #B) values varies from `0` to `1`, where `0` means the user is predicted to interact with the jokle, containing  `#A`, with 0% chance, and `1` – with 100% chance.


## Implementation

The implementation of the idea is based on using weighted oriented graphs as a data structure to store the tags.
The nodes of the graph represent tags, while the weight of an edge from #A to #B is IR(#A, #B). This, together with users individual interest table, storing their IR(U, #A) should allow us to create highly personalised experience for every user.


## Example 

Let's take user U, that we know is interested in `#food` with IR(U, #food) = 0.7. Also, the IR(#food, #cars)=0.8. That means, the user is likely to be shown more jokles containing `#cars`.
