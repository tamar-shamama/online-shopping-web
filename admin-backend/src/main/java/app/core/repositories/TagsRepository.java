package app.core.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import app.core.entities.Tags;

public interface TagsRepository extends JpaRepository<Tags, Integer> {

	boolean existsByTagName(String tagName);

	Tags findByTagName(String tagName);

}
