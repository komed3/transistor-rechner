<?php get_header(); ?>
<article class="<?php echo implode( ' ', get_post_class() ); ?>">
    <?php if( has_post_thumbnail() ) { ?>
        <div class="attachment" style="background-image: url( <?php the_post_thumbnail_url( 'large' ); ?> );"></div>
    <?php } ?>
    <h1><?php the_title(); ?></h1>
    <div class="body">
        <?php the_content(); ?>
    </div>
</article>
<?php get_footer(); ?>