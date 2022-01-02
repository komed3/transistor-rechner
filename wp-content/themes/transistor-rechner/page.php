<?php get_header(); ?>
<article class="<?php echo implode( ' ', get_post_class() ); ?>">
    <h1><?php the_title(); ?></h1>
    <div class="body">
        <?php the_content(); ?>
    </div>
</article>
<?php get_footer(); ?>