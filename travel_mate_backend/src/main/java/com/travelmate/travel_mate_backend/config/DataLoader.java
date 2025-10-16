package com.travelmate.travel_mate_backend.config;

import com.travelmate.travel_mate_backend.model.Destination;
import com.travelmate.travel_mate_backend.repository.DestinationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

        @Autowired
        private DestinationRepository destinationRepository;

        @Override
        public void run(String... args) throws Exception {
                // Clear existing data
                destinationRepository.deleteAll();

                // Add sample destinations
                Destination paris = new Destination();
                paris.setName("Paris");
                paris.setDescription("The city of love with iconic landmarks like the Eiffel Tower and Louvre Museum.");
                paris.setImageUrl(
                                "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=500&q=80");
                paris.setBudget("medium");
                paris.setWeather("mild");
                paris.setInterests("historical,romantic");
                destinationRepository.save(paris);

                Destination newYork = new Destination();
                newYork.setName("New York");
                newYork.setDescription("The city that never sleeps with iconic skyscrapers and Broadway shows.");
                newYork.setImageUrl(
                                "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=500&q=80");
                newYork.setBudget("high");
                newYork.setWeather("varied");
                newYork.setInterests("urban,cultural");
                destinationRepository.save(newYork);

                Destination tokyo = new Destination();
                tokyo.setName("Tokyo");
                tokyo.setDescription("A vibrant mix of traditional culture and futuristic technology.");
                tokyo.setImageUrl(
                                "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=500&q=80");
                tokyo.setBudget("medium");
                tokyo.setWeather("varied");
                tokyo.setInterests("urban,cultural");
                destinationRepository.save(tokyo);

                Destination bali = new Destination();
                bali.setName("Bali");
                bali.setDescription("Tropical paradise with beautiful beaches and rich cultural heritage.");
                bali.setImageUrl(
                                "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=500&q=80");
                bali.setBudget("low");
                bali.setWeather("tropical");
                bali.setInterests("beach,adventure");
                destinationRepository.save(bali);

                System.out.println("Sample destinations loaded successfully!");
        }
}